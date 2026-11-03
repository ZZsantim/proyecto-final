import {
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { Subscription } from 'rxjs';
import QRCode from 'qrcode';
import fixture from '../../../assets/fixtures/test-data.json';
import { AuthService, UserRole } from '../../core/auth/auth.service';
import {
  BookingDetails,
  DemoAppointment,
  DemoStore,
  DemoVehicle,
  DemoWorkOrder,
  NewVehicle,
  WorkOrderStatus,
  VehicleType,
} from '../../core/demo/demo-store.service';
import { ScreenId } from '../../core/routing/screen-route';
import { SseService } from '../../core/eventos/sse.service';
import { PublicPagesComponent } from '../publicas/public-pages';
import { CustomerPagesComponent } from '../cliente/customer-pages';
import { ReceptionPagesComponent } from '../recepcion/reception-pages';
import { MechanicPagesComponent } from '../mecanico/mechanic-pages';
import { AdminPagesComponent } from '../administracion/admin-pages';

interface DemoAccount {
  role: UserRole;
  email: string;
  password: string;
  labelKey: string;
}

interface AvailableSlot {
  time: string;
  available: boolean;
}

interface CalendarDay {
  key: string;
  day: number;
  offset: number;
  inMonth: boolean;
  disabled: boolean;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  imports: [
    AdminPagesComponent,
    CustomerPagesComponent,
    MechanicPagesComponent,
    PublicPagesComponent,
    ReceptionPagesComponent,
    TranslatePipe,
  ],
  selector: 'app-portal-page',
  styleUrl: './portal-page.css',
  templateUrl: './portal-page.html',
})
export class PortalPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly store = inject(DemoStore);
  private readonly translate = inject(TranslateService);
  private readonly sse = inject(SseService);
  private readonly destroyRef = inject(DestroyRef);

  public readonly pageContext: PortalPageContext = this;
  public readonly screenId = toSignal(
    this.route.data.pipe(map((data) => data['screenId'] as ScreenId)),
    { initialValue: this.route.snapshot.data['screenId'] as ScreenId },
  );
  public readonly routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });
  public readonly user = this.auth.user;
  public readonly vehicles = this.store.vehicles;
  public readonly customerVehicles = this.store.currentCustomerVehicles;
  public readonly appointments = this.store.currentCustomerAppointments;
  public readonly todayAppointments = computed(() =>
    this.store
      .appointments()
      .filter(
        (appointment) =>
          appointment.dayOffset === 0 && !['CANCELADA', 'NO_ASISTIO'].includes(appointment.status),
      ),
  );
  public readonly occupiedBays = computed(
    () =>
      this.orders().filter((order) =>
        ['ASIGNADA', 'EN_DIAGNOSTICO', 'EN_REPARACION'].includes(order.status),
      ).length,
  );
  public readonly orders = this.store.orders;
  public readonly parts = this.store.parts;
  public readonly services = fixture.services;
  public readonly users = fixture.users;
  public readonly mechanics = fixture.users.filter(
    (user) => user.role === 'MECHANIC' && user.active,
  );
  public readonly auditEvents = fixture.auditEvents;
  public readonly failures = fixture.failures;
  public readonly booking = this.store.booking;
  public readonly pageTitleKey = computed(() => `pages.${this.screenId()}.title`);
  public readonly pageSubtitleKey = computed(() => `pages.${this.screenId()}.subtitle`);
  public readonly pageGroup = computed(() => {
    const screenId = this.screenId();
    if (screenId.startsWith('CL')) return 'cliente';
    if (screenId.startsWith('SE')) return 'recepcion';
    if (screenId.startsWith('ME')) return 'mecanico';
    if (screenId.startsWith('AD')) return 'administracion';
    return 'publicas';
  });
  public readonly bookingStep = computed(() => {
    const steps: Partial<Record<ScreenId, number>> = {
      'CL-02': 1,
      'CL-03': 2,
      'CL-04': 3,
      'CL-05': 4,
    };
    return steps[this.screenId()] ?? 0;
  });
  public readonly selectedOrder = computed(() => {
    const orderId = this.routeParams().get('orderId');
    return this.orders().find((order) => order.id === orderId) ?? this.orders()[0];
  });
  public readonly selectedVehicle = computed(() =>
    this.vehicles().find((vehicle) => vehicle.id === this.booking().vehicleId),
  );
  public readonly selectedService = computed(() =>
    this.services.find((service) => service.id === this.booking().serviceId),
  );
  public readonly accountOptions: DemoAccount[] = [
    {
      role: 'CLIENT',
      email: 'cliente1@electrostock.test',
      password: 'Cliente2026!',
      labelKey: 'credentials.client',
    },
    {
      role: 'RECEPTIONIST',
      email: 'recepcion@electrostock.test',
      password: 'Recep2026!',
      labelKey: 'credentials.receptionist',
    },
    {
      role: 'MECHANIC',
      email: 'mecanico1@electrostock.test',
      password: 'Meca2026!a',
      labelKey: 'credentials.mechanic',
    },
    {
      role: 'ADMIN',
      email: 'admin@electrostock.test',
      password: 'Admin2026!',
      labelKey: 'credentials.administrator',
    },
  ];
  public readonly vehicleTypes: VehicleType[] = [
    'E_BIKE',
    'SCOOTER',
    'SKATEBOARD',
    'MOTORCYCLE',
    'MONOWHEEL',
    'MICROCAR',
    'QUADRICYCLE',
  ];
  public readonly availableSlots: AvailableSlot[] = [
    { time: '08:00', available: false },
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
  ];
  public readonly countdown = signal(300);
  public readonly timerExpired = signal(false);
  public readonly countdownAnnouncement = signal('');
  public readonly pageNotice = signal('');
  public readonly errorMessage = signal('');
  public readonly selectedTrackingOrder = signal<DemoWorkOrder | null>(null);
  public readonly newlyCreatedOrder = this.store.latestCreatedOrder;
  public readonly trackingQr = signal<string | null>(null);
  public readonly qrError = signal('');
  public readonly confirmCancelId = signal<string | null>(null);
  public readonly pendingRescheduleId = signal<string | null>(null);
  public readonly pendingTransition = signal<WorkOrderStatus | null>(null);
  public readonly selectedOrderId = signal('O1');
  public readonly rating = signal(5);
  public readonly cancellationWarning = signal(false);
  public readonly bookingConfirmed = signal(false);
  public readonly timeNow = new Date();
  public readonly calendarMonth = signal(
    new Date(this.timeNow.getFullYear(), this.timeNow.getMonth(), 1),
  );
  public readonly calendarDays = computed(() => {
    const month = this.calendarMonth();
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const firstCell = new Date(first.getFullYear(), first.getMonth(), 1 - first.getDay());
    return Array.from({ length: 42 }, (_, index): CalendarDay => {
      const date = new Date(
        firstCell.getFullYear(),
        firstCell.getMonth(),
        firstCell.getDate() + index,
      );
      const offset = this.daysFromToday(date);
      return {
        key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        day: date.getDate(),
        offset,
        inMonth: date.getMonth() === month.getMonth(),
        disabled: offset <= 0 || date.getDay() === 0 || date.getMonth() !== month.getMonth(),
      };
    });
  });
  public readonly calendarWeeks = computed(() => {
    const days = this.calendarDays();
    return Array.from({ length: 6 }, (_, index) => days.slice(index * 7, index * 7 + 7));
  });
  private confirmationTrigger: HTMLElement | null = null;
  public readonly language = toSignal(
    this.translate.onLangChange.pipe(map((event) => event.lang)),
    { initialValue: this.translate.getCurrentLang() ?? 'es' },
  );

  public email = '';
  public password = '';
  public fullName = '';
  public phone = '';
  public documentNumber = '';
  public formError = '';
  public formMessage = '';
  public trackingCode = 'K7M2QX9P4T';
  public newVehicle: NewVehicle = {
    type: 'SCOOTER',
    makeModel: '',
    year: new Date().getFullYear(),
    serial: '',
    plate: '',
    voltage: 48,
    battery: '',
  };
  public walkInVehicleId = 'V8';
  public walkInFailure = 'F02';
  public walkInPriority: 'ALTA' | 'MEDIA' | 'BAJA' = 'ALTA';
  public mechanic = this.mechanics[0]?.name ?? '';
  public comment = '';
  private timerHandle: ReturnType<typeof setInterval> | null = null;
  private trackingSubscription: Subscription | null = null;
  private previousScreenId: ScreenId | null = null;

  constructor() {
    effect(() => {
      const currentScreenId = this.screenId();
      if (currentScreenId === 'CL-05') {
        this.bookingConfirmed.set(false);
        this.startCountdown();
      } else {
        this.stopCountdown();
      }
      if (this.previousScreenId !== null && this.previousScreenId !== currentScreenId) {
        this.errorMessage.set('');
        this.pageNotice.set('');
        this.formError = '';
        this.formMessage = '';
        this.confirmCancelId.set(null);
        this.pendingRescheduleId.set(null);
        this.pendingTransition.set(null);
        this.cancellationWarning.set(false);
      }
      this.previousScreenId = currentScreenId;
    });
    effect(() => {
      const code = this.routeParams().get('trackingCode');
      if (this.screenId() === 'PU-03' && code) {
        this.trackingCode = code;
        this.trackOrder();
      }
    });
    this.destroyRef.onDestroy(() => {
      this.stopCountdown();
      this.trackingSubscription?.unsubscribe();
    });
  }

  public signIn(): void {
    const result = this.auth.login(this.email, this.password);
    if (result === 'inactive') {
      this.formError = 'auth.accountInactive';
      return;
    }
    if (result === 'invalid') {
      this.formError = 'auth.loginError';
      return;
    }

    this.formError = '';
    this.router.navigateByUrl(this.homeForRole(this.auth.role()!));
  }

  public signInAs(account: DemoAccount): void {
    this.email = account.email;
    this.password = account.password;
    this.signIn();
  }

  public createAccount(): void {
    const registered = this.auth.register(this.fullName, this.email, this.password);
    if (!registered) {
      this.formError = 'auth.loginError';
      return;
    }
    this.formError = '';
    this.formMessage = 'auth.signupSuccess';
  }

  public setBooking<K extends keyof BookingDetails>(key: K, value: BookingDetails[K]): void {
    this.store.setBooking(key, value);
  }

  public selectTime(time: string): void {
    this.store.setBooking('time', time);
  }

  public continueBooking(): void {
    const nextPath: Partial<Record<ScreenId, string>> = {
      'CL-02': '/cliente/agendar/dia',
      'CL-03': '/cliente/agendar/hora',
      'CL-04': '/cliente/agendar/confirmar',
    };
    const path = nextPath[this.screenId()];
    if (path) {
      this.router.navigateByUrl(path);
    }
  }

  public confirmBooking(): void {
    if (this.timerExpired()) {
      this.errorMessage.set('messages.reserveExpired');
      return;
    }
    if (!this.store.confirmBooking()) {
      this.errorMessage.set('messages.selectedServiceUnavailable');
      return;
    }
    this.errorMessage.set('');
    this.bookingConfirmed.set(true);
    this.pageNotice.set('messages.bookingConfirmed');
  }

  public returnToTimeSelection(): void {
    this.errorMessage.set('');
    this.router.navigateByUrl('/cliente/agendar/hora');
  }

  public changeCalendarMonth(months: number): void {
    this.calendarMonth.update(
      (month) => new Date(month.getFullYear(), month.getMonth() + months, 1),
    );
  }

  public selectCalendarDay(offset: number): void {
    this.store.setBooking('dayOffset', offset);
  }

  public calendarMonthLabel(): string {
    return new Intl.DateTimeFormat(this.language() === 'es' ? 'es-CO' : 'en-US', {
      month: 'long',
      year: 'numeric',
    }).format(this.calendarMonth());
  }

  public calendarWeekdays(): string[] {
    const formatter = new Intl.DateTimeFormat(this.language() === 'es' ? 'es-CO' : 'en-US', {
      weekday: 'short',
    });
    const sunday = new Date(2024, 0, 7);
    return Array.from({ length: 7 }, (_, index) =>
      formatter.format(new Date(2024, 0, sunday.getDate() + index)),
    );
  }

  public requestCancel(appointment: DemoAppointment, event: MouseEvent): void {
    if (this.isInsideCancellationWindow(appointment)) {
      this.cancellationWarning.set(true);
      return;
    }
    this.confirmationTrigger = event.currentTarget as HTMLElement;
    this.confirmCancelId.set(appointment.id);
  }

  public cancelAppointment(): void {
    const id = this.confirmCancelId();
    if (id) {
      this.store.cancelAppointment(id);
      this.confirmCancelId.set(null);
      this.pageNotice.set('messages.cancelSuccess');
      this.restoreConfirmationFocus();
    }
  }

  public openReschedule(appointment: DemoAppointment, event: MouseEvent): void {
    if (this.isInsideCancellationWindow(appointment)) {
      this.cancellationWarning.set(true);
      return;
    }
    this.cancellationWarning.set(false);
    this.store.setBooking('vehicleId', appointment.vehicleId);
    this.store.setBooking('serviceId', appointment.serviceId);
    this.store.setBooking('dayOffset', appointment.dayOffset);
    this.store.setBooking('time', appointment.time);
    this.router.navigateByUrl('/cliente/reprogramar');
    this.confirmationTrigger = event.currentTarget as HTMLElement;
  }

  public requestReschedule(appointment: DemoAppointment, event: MouseEvent): void {
    if (this.isInsideCancellationWindow(appointment)) {
      this.cancellationWarning.set(true);
      return;
    }
    this.confirmationTrigger = event.currentTarget as HTMLElement;
    this.pendingRescheduleId.set(appointment.id);
  }

  public confirmReschedule(): void {
    const appointment = this.appointments().find((item) => item.id === this.pendingRescheduleId());
    if (!appointment) {
      return;
    }
    this.store.rescheduleAppointment(appointment.id, this.booking().dayOffset, this.booking().time);
    this.pendingRescheduleId.set(null);
    this.pageNotice.set('messages.bookingConfirmed');
    this.restoreConfirmationFocus();
    this.router.navigateByUrl('/cliente/mis-citas');
  }

  public closeConfirmation(): void {
    this.confirmCancelId.set(null);
    this.pendingRescheduleId.set(null);
    this.pendingTransition.set(null);
    this.restoreConfirmationFocus();
  }

  public trapConfirmationFocus(event: KeyboardEvent, dialog: HTMLElement): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (this.timerExpired()) {
        this.returnToTimeSelection();
      } else {
        this.closeConfirmation();
      }
      return;
    }
    if (event.key !== 'Tab') {
      return;
    }
    const controls = dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
    );
    if (!controls?.length) {
      return;
    }
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && this.documentActiveElement(dialog) === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && this.documentActiveElement(dialog) === last) {
      event.preventDefault();
      first.focus();
    }
  }

  public registerVehicle(): void {
    if (!this.newVehicle.makeModel.trim() || !this.newVehicle.serial.trim()) {
      this.formError = 'ui.required';
      return;
    }

    if (this.screenId() === 'SE-03') {
      if (!this.fullName.trim() || !this.documentNumber.trim()) {
        this.formError = 'ui.required';
        return;
      }
      const customer = this.store.registerCustomer({
        name: this.fullName.trim(),
        document: this.documentNumber.trim(),
        email: this.email.trim(),
        phone: this.phone.trim(),
      });
      const vehicle = this.store.registerVehicle(this.newVehicle, customer.id);
      this.walkInVehicleId = vehicle.id;
      this.formMessage = 'messages.customerSaved';
    } else {
      this.store.registerVehicle(this.newVehicle);
      this.formMessage = 'messages.vehicleSaved';
    }
    this.formError = '';
    this.newVehicle = { ...this.newVehicle, makeModel: '', serial: '', plate: '', battery: '' };
  }

  public createWorkOrder(): void {
    const failure = this.failureName(this.walkInFailure);
    const order = this.store.createWorkOrder({
      vehicleId: this.walkInVehicleId,
      failure: failure ?? '',
      priority: this.walkInPriority,
    });
    this.trackingQr.set(null);
    this.qrError.set('');
    void QRCode.toDataURL(order.trackingCode, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 192,
    }).then(
      (dataUrl) => {
        if (this.newlyCreatedOrder()?.id === order.id) {
          this.trackingQr.set(dataUrl);
        }
      },
      (error: unknown) => {
        console.error('Unable to generate the work-order tracking QR code.', error);
        this.qrError.set('messages.qrGenerationFailed');
      },
    );
    this.selectedOrderId.set(order.id);
    this.formMessage = 'messages.orderCreated';
  }

  public trackOrder(): void {
    const order = this.store.publicOrderByCode(this.trackingCode);
    this.selectedTrackingOrder.set(order ?? null);
    this.errorMessage.set(order ? '' : 'messages.trackingNotFound');
    this.trackingSubscription?.unsubscribe();
    if (order) {
      this.trackingSubscription = this.sse.watchOrder(order.id).subscribe({
        next: (event) => {
          this.selectedTrackingOrder.update((current) =>
            current
              ? {
                  ...current,
                  status: event.status,
                  timeline: [...current.timeline, event.status],
                }
              : current,
          );
        },
        error: () => this.errorMessage.set('messages.errorGeneric'),
      });
    }
  }

  public requestTransition(nextStatus: WorkOrderStatus, event: MouseEvent): void {
    this.confirmationTrigger = event.currentTarget as HTMLElement;
    this.pendingTransition.set(nextStatus);
  }

  public confirmTransition(): void {
    const nextStatus = this.pendingTransition();
    const order = this.selectedOrder();
    if (!nextStatus || !order) {
      return;
    }
    const updated = this.store.transitionOrder(order.id, nextStatus);
    if (!updated) {
      this.errorMessage.set('messages.errorGeneric');
      return;
    }
    this.pendingTransition.set(null);
    this.pageNotice.set('messages.statusUpdated');
    this.restoreConfirmationFocus();
  }

  public validTransitions(): WorkOrderStatus[] {
    const order = this.selectedOrder();
    return order ? this.store.validTransitions(order.status) : [];
  }

  public transitionActionKey(status: WorkOrderStatus): string {
    const keys: Record<WorkOrderStatus, string> = {
      INGRESADA: 'actions.createOrder',
      ASIGNADA: 'actions.startDiagnosis',
      EN_DIAGNOSTICO: 'actions.startRepair',
      EN_REPARACION: 'actions.finishRepair',
      ESPERANDO_REPUESTO: 'actions.waitForPart',
      FINALIZADA: 'actions.deliver',
      ENTREGADA: 'actions.deliver',
    };
    return keys[status];
  }

  public assignMechanic(): void {
    this.store.assignMechanic(this.selectedOrderId(), this.mechanic);
    this.pageNotice.set('messages.statusUpdated');
  }

  public submitSurvey(): void {
    this.formMessage = 'messages.surveySaved';
  }

  public vehicleById(vehicleId: string): DemoVehicle | undefined {
    return this.vehicles().find((vehicle) => vehicle.id === vehicleId);
  }

  public vehicleName(vehicleId: string): string {
    return this.vehicleById(vehicleId)?.makeModel ?? vehicleId;
  }

  public serviceName(serviceId: string): string {
    const key = `data.services.${serviceId}`;
    const translated = this.translate.instant(key);
    return translated === key
      ? (this.services.find((service) => service.id === serviceId)?.name ?? serviceId)
      : translated;
  }

  public serviceParts(serviceId: string): string {
    const service = this.services.find((item) => item.id === serviceId);
    const parts = service?.partIds ?? [];
    return parts.length
      ? parts.map((partId) => this.partName(partId)).join(', ')
      : this.translate.instant('ui.available');
  }

  public failureName(failureId: string): string {
    const key = `data.failures.${failureId}`;
    const translated = this.translate.instant(key);
    return translated === key
      ? (this.failures.find((failure) => failure.id === failureId)?.name ?? failureId)
      : translated;
  }

  public partName(partId: string): string {
    const key = `data.parts.${partId}`;
    const translated = this.translate.instant(key);
    return translated === key
      ? (this.parts().find((part) => part.id === partId)?.name ?? partId)
      : translated;
  }

  public orderDiagnosis(order: DemoWorkOrder): string {
    const key = `data.diagnoses.${order.id}`;
    const translated = this.translate.instant(key);
    return translated === key ? order.diagnosis : translated;
  }

  public timelineText(step: string): string {
    const [label, ...details] = step.split(' · ');
    const status = label
      .trim()
      .toUpperCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replaceAll(' ', '_');
    const translated = this.translate.instant(this.statusKey(status));
    if (translated !== this.statusKey(status)) {
      return [translated, ...details].join(' · ');
    }
    return step;
  }

  public dateForOffset(offset: number): string {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return new Intl.DateTimeFormat(this.language() === 'es' ? 'es-CO' : 'en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(date);
  }

  public formatMoney(value: number): string {
    return new Intl.NumberFormat(this.language() === 'es' ? 'es-CO' : 'en-US', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  public formatRating(value: number): string {
    return new Intl.NumberFormat(this.language() === 'es' ? 'es-CO' : 'en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  }

  public remainingStock(physical: number, reserved: number): number {
    return Math.max(physical - reserved, 0);
  }

  public isServiceUnavailable(): boolean {
    const service = this.selectedService();
    return !!service?.partIds.some((partId) => {
      const part = this.parts().find((item) => item.id === partId);
      return !part || this.remainingStock(part.physical, part.reserved) === 0;
    });
  }

  public unavailablePartName(): string {
    const service = this.selectedService();
    const partId = service?.partIds.find((id) =>
      this.parts().some(
        (part) => part.id === id && this.remainingStock(part.physical, part.reserved) === 0,
      ),
    );
    return partId ? this.partName(partId) : '';
  }

  public dayKey(offset: number): string {
    return offset === 1 ? 'ui.tomorrow' : '';
  }

  public isInsideCancellationWindow(appointment: DemoAppointment): boolean {
    const [hours, minutes] = appointment.time.split(':').map(Number);
    const scheduled = new Date();
    scheduled.setDate(scheduled.getDate() + appointment.dayOffset);
    scheduled.setHours(hours, minutes, 0, 0);
    return scheduled.getTime() - Date.now() < 60 * 60 * 1000;
  }

  public get selectableDays(): number[] {
    return Array.from({ length: 7 }, (_, index) => index + 1)
      .filter((offset) => (this.timeNow.getDay() + offset) % 7 !== 0)
      .slice(0, 6);
  }

  public vehicleTypeKey(type: VehicleType): string {
    return `vehicleTypes.${type}`;
  }

  public statusKey(status: string): string {
    return `status.${status}`;
  }

  public transitionMessageParams(
    current: WorkOrderStatus,
    next: WorkOrderStatus,
  ): Record<string, string> {
    const allowed = this.store
      .validTransitions(current)
      .map((status) => this.translate.instant(this.statusKey(status)))
      .join(', ');
    return {
      current: this.translate.instant(this.statusKey(current)),
      next: this.translate.instant(this.statusKey(next)),
      allowed,
    };
  }

  public priorityKey(priority: string): string {
    return `status.${priority}`;
  }

  public statusTone(status: string): string {
    if (['CONFIRMADA', 'ENTREGADA', 'ACTIVE'].includes(status)) {
      return 'good';
    }
    if (['EN_REPARACION', 'EN_DIAGNOSTICO', 'REPROGRAMADA'].includes(status)) {
      return 'info';
    }
    if (['ALTA', 'ESPERANDO_REPUESTO', 'INACTIVE'].includes(status)) {
      return 'alert';
    }
    return 'neutral';
  }

  public timerText(): string {
    const minutes = Math.floor(this.countdown() / 60);
    const seconds = this.countdown() % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  public dashboardPath(): string {
    const role = this.auth.role();
    return role ? this.homeForRole(role) : '/iniciar-sesion';
  }

  public homeForRole(role: UserRole): string {
    const home: Record<UserRole, string> = {
      CLIENT: '/cliente/mis-citas',
      RECEPTIONIST: '/recepcion/agenda',
      MECHANIC: '/mecanico/bahia',
      ADMIN: '/administracion/indicadores',
    };
    return home[role];
  }

  private startCountdown(): void {
    if (this.timerHandle) {
      return;
    }
    this.countdown.set(300);
    this.timerExpired.set(false);
    this.countdownAnnouncement.set('');
    this.timerHandle = setInterval(() => {
      const current = this.countdown();
      if (current === 61 || current === 11) {
        this.countdownAnnouncement.set(
          this.translate.instant('messages.timeAlmostUp', {
            seconds: current - 1,
          }),
        );
      }
      if (current <= 1) {
        this.countdown.set(0);
        this.timerExpired.set(true);
        this.countdownAnnouncement.set(this.translate.instant('messages.reserveExpired'));
        this.stopCountdown();
        return;
      }
      this.countdown.set(current - 1);
    }, 1000);
  }

  private stopCountdown(): void {
    if (this.timerHandle) {
      clearInterval(this.timerHandle);
      this.timerHandle = null;
    }
  }

  private restoreConfirmationFocus(): void {
    const trigger = this.confirmationTrigger;
    this.confirmationTrigger = null;
    queueMicrotask(() => trigger?.focus());
  }

  private daysFromToday(date: Date): number {
    const today = new Date(
      this.timeNow.getFullYear(),
      this.timeNow.getMonth(),
      this.timeNow.getDate(),
    );
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.round((target.getTime() - today.getTime()) / 86_400_000);
  }

  private documentActiveElement(dialog: HTMLElement): Element | null {
    return dialog.ownerDocument.activeElement;
  }
}

export type PortalPageContext = Pick<PortalPageComponent, keyof PortalPageComponent>;
