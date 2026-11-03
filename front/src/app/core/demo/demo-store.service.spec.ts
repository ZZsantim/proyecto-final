import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';
import { DemoStore } from './demo-store.service';
import { SseService } from '../eventos/sse.service';

describe('DemoStore', () => {
  let auth: AuthService;
  let store: DemoStore;

  beforeEach(() => {
    auth = TestBed.inject(AuthService);
    store = TestBed.inject(DemoStore);
  });

  it('scopes customer appointments and vehicles to the signed-in customer', () => {
    auth.login('cliente1@electrostock.test', 'Cliente2026!');
    expect(store.currentCustomerVehicles().map((vehicle) => vehicle.id)).toEqual([
      'V1',
      'V2',
    ]);
    expect(
      store.currentCustomerAppointments().map((appointment) => appointment.id),
    ).toContain('CT2');
  });

  it('allows only valid work-order transitions', () => {
    expect(store.transitionOrder('O1', 'ENTREGADA')).toBe(false);
    expect(store.transitionOrder('O1', 'FINALIZADA')).toBe(true);
    expect(store.validTransitions('FINALIZADA')).toEqual(['ENTREGADA']);
  });

  it('updates appointment state in memory', () => {
    store.cancelAppointment('CT2');
    expect(store.appointments().find((appointment) => appointment.id === 'CT2')?.status).toBe(
      'CANCELADA',
    );
  });

  it('reserves and releases required parts with an appointment', () => {
    const initialReserved = store.parts().find((part) => part.id === 'R01')?.reserved;
    const appointment = store.confirmBooking();
    expect(appointment).not.toBeNull();
    expect(store.parts().find((part) => part.id === 'R01')?.reserved).toBe(
      (initialReserved ?? 0) + 1,
    );

    if (!appointment) {
      throw new Error('The appointment should be confirmed for an available part.');
    }
    store.cancelAppointment(appointment.id);
    expect(store.parts().find((part) => part.id === 'R01')?.reserved).toBe(
      initialReserved,
    );
  });

  it('does not confirm an appointment when its required part is unavailable', () => {
    store.setBooking('serviceId', 'S03');
    expect(store.confirmBooking()).toBeNull();
  });

  it('publishes valid status changes to public tracking listeners', () => {
    let receivedStatus = '';
    const subscription = TestBed.inject(SseService)
      .watchOrder('O1')
      .subscribe((event) => {
        receivedStatus = event.status;
      });

    expect(store.transitionOrder('O1', 'FINALIZADA')).toBe(true);
    expect(receivedStatus).toBe('FINALIZADA');
    subscription.unsubscribe();
  });

  it('assigns a registered vehicle to the newly created customer', () => {
    const customer = store.registerCustomer({
      name: 'Sofía Demo',
      document: 'CC 123456',
      email: 'sofia@example.test',
      phone: '3000000000',
    });
    const vehicle = store.registerVehicle(
      {
        type: 'SCOOTER',
        makeModel: 'Demo Scooter',
        year: 2026,
        serial: 'DM-001',
        plate: '',
        voltage: 48,
        battery: '15 Ah',
      },
      customer.id,
    );

    expect(vehicle.ownerId).toBe(customer.id);
  });
});
