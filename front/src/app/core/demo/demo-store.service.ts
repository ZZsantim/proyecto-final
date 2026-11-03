import { Injectable, computed, inject, signal } from '@angular/core';
import fixture from '../../../assets/fixtures/test-data.json';
import { AuthService } from '../auth/auth.service';
import { SseService } from '../eventos/sse.service';

export type VehicleType =
  | 'E_BIKE'
  | 'SCOOTER'
  | 'SKATEBOARD'
  | 'MOTORCYCLE'
  | 'MONOWHEEL'
  | 'MICROCAR'
  | 'QUADRICYCLE';

export type WorkOrderStatus =
  | 'INGRESADA'
  | 'ASIGNADA'
  | 'EN_DIAGNOSTICO'
  | 'EN_REPARACION'
  | 'ESPERANDO_REPUESTO'
  | 'FINALIZADA'
  | 'ENTREGADA';

export interface DemoVehicle {
  id: string;
  ownerId: string;
  type: VehicleType;
  serial: string;
  plate: string;
  makeModel: string;
  year: number;
  voltage: number;
  battery: string;
}

export interface DemoCustomer {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
}

export interface DemoAppointment {
  id: string;
  code: string;
  ownerId: string;
  vehicleId: string;
  serviceId: string;
  dayOffset: number;
  time: string;
  status: string;
  workOrderId: string | null;
}

export interface DemoWorkOrder {
  id: string;
  number: string;
  trackingCode: string;
  vehicleId: string;
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
  mechanic: string;
  status: WorkOrderStatus;
  diagnosis: string;
  estimatedDelivery: string;
  timeline: string[];
}

export interface BookingDetails {
  vehicleId: string;
  serviceId: string;
  dayOffset: number;
  time: string;
}

export interface NewVehicle {
  type: VehicleType;
  makeModel: string;
  year: number;
  serial: string;
  plate: string;
  voltage: number;
  battery: string;
}

export interface NewCustomer {
  name: string;
  document: string;
  email: string;
  phone: string;
}

export interface NewWorkOrder {
  vehicleId: string;
  failure: string;
  priority: 'ALTA' | 'MEDIA' | 'BAJA';
}

const INITIAL_OWNER_BY_USER: Record<string, string> = {
  U6: 'C1',
  U7: 'C2',
  U8: 'C4',
};

const VALID_TRANSITIONS: Record<WorkOrderStatus, WorkOrderStatus[]> = {
  INGRESADA: ['ASIGNADA'],
  ASIGNADA: ['EN_DIAGNOSTICO'],
  EN_DIAGNOSTICO: ['EN_REPARACION', 'ESPERANDO_REPUESTO'],
  EN_REPARACION: ['FINALIZADA'],
  ESPERANDO_REPUESTO: ['EN_REPARACION'],
  FINALIZADA: ['ENTREGADA'],
  ENTREGADA: [],
};

const VEHICLE_TYPES: VehicleType[] = [
  'E_BIKE',
  'SCOOTER',
  'SKATEBOARD',
  'MOTORCYCLE',
  'MONOWHEEL',
  'MICROCAR',
  'QUADRICYCLE',
];
const VEHICLE_TYPE_SET = new Set<string>(VEHICLE_TYPES);

const ORDER_STATUSES: WorkOrderStatus[] = [
  'INGRESADA',
  'ASIGNADA',
  'EN_DIAGNOSTICO',
  'EN_REPARACION',
  'ESPERANDO_REPUESTO',
  'FINALIZADA',
  'ENTREGADA',
];
const ORDER_STATUS_SET = new Set<string>(ORDER_STATUSES);

function isVehicleType(value: string): value is VehicleType {
  return VEHICLE_TYPE_SET.has(value);
}

function isWorkOrderStatus(value: string): value is WorkOrderStatus {
  return ORDER_STATUS_SET.has(value);
}

function isPriority(value: string): value is DemoWorkOrder['priority'] {
  return value === 'ALTA' || value === 'MEDIA' || value === 'BAJA';
}

function readVehicles(): DemoVehicle[] {
  return fixture.vehicles.map((vehicle) => {
    if (!isVehicleType(vehicle.type)) {
      throw new Error(`Unknown vehicle type in demo fixture: ${vehicle.type}`);
    }
    return { ...vehicle, type: vehicle.type };
  });
}

function readOrders(): DemoWorkOrder[] {
  return fixture.workOrders.map((order) => {
    if (!isWorkOrderStatus(order.status) || !isPriority(order.priority)) {
      throw new Error(`Invalid work order status in demo fixture: ${order.id}`);
    }
    return {
      ...order,
      priority: order.priority,
      status: order.status,
    };
  });
}

@Injectable({ providedIn: 'root' })
export class DemoStore {
  private readonly auth = inject(AuthService);
  private readonly sse = inject(SseService);
  private readonly vehicleState = signal<DemoVehicle[]>(readVehicles());
  private readonly customerState = signal<DemoCustomer[]>(fixture.customers);
  private readonly appointmentState = signal<DemoAppointment[]>(fixture.appointments);
  private readonly orderState = signal<DemoWorkOrder[]>(readOrders());
  private readonly partState = signal(fixture.parts);

  readonly vehicles = this.vehicleState.asReadonly();
  readonly customers = this.customerState.asReadonly();
  readonly appointments = this.appointmentState.asReadonly();
  readonly orders = this.orderState.asReadonly();
  readonly parts = this.partState.asReadonly();
  readonly latestCreatedOrder = signal<DemoWorkOrder | null>(null);
  readonly booking = signal<BookingDetails>({
    vehicleId: 'V1',
    serviceId: 'S02',
    dayOffset: 1,
    time: '10:00',
  });
  readonly currentOwnerId = computed(() => {
    const userId = this.auth.user()?.id;
    return userId ? INITIAL_OWNER_BY_USER[userId] ?? 'C1' : 'C1';
  });

  readonly currentCustomerVehicles = computed(() =>
    this.vehicleState().filter(
      (vehicle) => vehicle.ownerId === this.currentOwnerId(),
    ),
  );

  readonly currentCustomerAppointments = computed(() =>
    this.appointmentState().filter(
      (appointment) =>
        appointment.ownerId === this.currentOwnerId() &&
        !['CANCELADA', 'NO_ASISTIO'].includes(appointment.status),
    ),
  );

  setBooking<K extends keyof BookingDetails>(
    key: K,
    value: BookingDetails[K],
  ): void {
    this.booking.update((current) => ({ ...current, [key]: value }));
  }

  confirmBooking(): DemoAppointment | null {
    const details = this.booking();
    const service = fixture.services.find(
      (item) => item.id === details.serviceId,
    );
    const partIds = service?.partIds ?? [];
    if (
      partIds.some((partId) => {
        const part = this.partState().find((item) => item.id === partId);
        return !part || part.physical - part.reserved <= 0;
      })
    ) {
      return null;
    }

    const newAppointment: DemoAppointment = {
      id: `CT${this.appointmentState().length + 1}`,
      code: `CITA-D${details.dayOffset}-${String(this.appointmentState().length + 1).padStart(4, '0')}`,
      ownerId: this.currentOwnerId(),
      vehicleId: details.vehicleId,
      serviceId: details.serviceId,
      dayOffset: details.dayOffset,
      time: details.time,
      status: 'CONFIRMADA',
      workOrderId: null,
    };
    this.appointmentState.update((items) => [...items, newAppointment]);
    this.partState.update((parts) =>
      parts.map((part) =>
        partIds.includes(part.id)
          ? { ...part, reserved: part.reserved + 1 }
          : part,
      ),
    );
    return newAppointment;
  }

  cancelAppointment(id: string): void {
    const appointment = this.appointmentState().find((item) => item.id === id);
    if (!appointment || appointment.status === 'CANCELADA') {
      return;
    }
    const service = fixture.services.find(
      (item) => item.id === appointment.serviceId,
    );
    const partIds = service?.partIds ?? [];
    this.appointmentState.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: 'CANCELADA' } : item,
      ),
    );
    this.partState.update((parts) =>
      parts.map((part) =>
        partIds.includes(part.id)
          ? { ...part, reserved: Math.max(part.reserved - 1, 0) }
          : part,
      ),
    );
  }

  rescheduleAppointment(id: string, dayOffset: number, time: string): void {
    this.appointmentState.update((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, dayOffset, time, status: 'REPROGRAMADA' }
          : item,
      ),
    );
  }

  registerCustomer(details: NewCustomer): DemoCustomer {
    const customer: DemoCustomer = {
      ...details,
      id: `C${this.customerState().length + 1}`,
    };
    this.customerState.update((items) => [...items, customer]);
    return customer;
  }

  registerVehicle(
    details: NewVehicle,
    ownerId: string = this.currentOwnerId(),
  ): DemoVehicle {
    const vehicle: DemoVehicle = {
      ...details,
      id: `V${this.vehicleState().length + 1}`,
      ownerId,
    };
    this.vehicleState.update((items) => [...items, vehicle]);
    return vehicle;
  }

  createWorkOrder(details: NewWorkOrder): DemoWorkOrder {
    const nextNumber = this.orderState().length + 1;
    const order: DemoWorkOrder = {
      id: `O${nextNumber}`,
      number: `OT-${String(nextNumber).padStart(6, '0')}`,
      trackingCode: this.createTrackingCode(),
      vehicleId: details.vehicleId,
      priority: details.priority,
      mechanic: '',
      status: 'INGRESADA',
      diagnosis: details.failure,
      estimatedDelivery: 'Por asignar',
      timeline: ['Ingresada'],
    };
    this.orderState.update((items) => [order, ...items]);
    this.latestCreatedOrder.set(order);
    return order;
  }

  validTransitions(status: WorkOrderStatus): WorkOrderStatus[] {
    return VALID_TRANSITIONS[status];
  }

  transitionOrder(
    orderId: string,
    nextStatus: WorkOrderStatus,
  ): boolean {
    const order = this.orderState().find((item) => item.id === orderId);
    if (!order || !VALID_TRANSITIONS[order.status].includes(nextStatus)) {
      return false;
    }
    const updatedOrder: DemoWorkOrder = {
      ...order,
      status: nextStatus,
      timeline: [...order.timeline, nextStatus],
    };
    this.orderState.update((items) =>
      items.map((item) => (item.id === orderId ? updatedOrder : item)),
    );

    this.sse.publish({
      id: globalThis.crypto.randomUUID(),
      orderId: updatedOrder.id,
      status: updatedOrder.status,
      occurredAt: new Date().toISOString(),
    });
    return true;
  }

  assignMechanic(orderId: string, mechanic: string): void {
    this.orderState.update((orders) =>
      orders.map((order) =>
        order.id === orderId ? { ...order, mechanic } : order,
      ),
    );
  }

  publicOrderByCode(code: string): DemoWorkOrder | undefined {
    return this.orderState().find(
      (order) => order.trackingCode.toLowerCase() === code.trim().toLowerCase(),
    );
  }

  private createTrackingCode(): string {
    const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    const randomBytes = new Uint8Array(10);
    globalThis.crypto.getRandomValues(randomBytes);
    return [...randomBytes]
      .map((byte) => alphabet[byte % alphabet.length])
      .join('');
  }
}
