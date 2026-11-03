import { DestroyRef, Injectable, inject } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';
import { environment } from '../config/entorno';
import { WorkOrderStatus } from '../demo/demo-store.service';

export interface WorkOrderStatusEvent {
  id: string;
  orderId: string;
  status: WorkOrderStatus;
  occurredAt: string;
}

@Injectable({ providedIn: 'root' })
export class SseService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly localEvents = new Subject<WorkOrderStatusEvent>();
  private readonly channel =
    environment.mockMode && typeof BroadcastChannel !== 'undefined'
      ? new BroadcastChannel('electrostock-demo-order-events')
      : null;

  constructor() {
    if (this.channel) {
      this.channel.addEventListener('message', (message: MessageEvent<unknown>) => {
        if (!isStatusEvent(message.data)) {
          this.localEvents.error(
            new Error('The local work-order event payload is invalid.'),
          );
          return;
        }
        this.localEvents.next(message.data);
      });
      this.destroyRef.onDestroy(() => this.channel?.close());
    }
  }

  watchOrder(orderId: string): Observable<WorkOrderStatusEvent> {
    if (environment.mockMode) {
      return this.localEvents
        .asObservable()
        .pipe(filter((event) => event.orderId === orderId));
    }

    return new Observable<WorkOrderStatusEvent>((subscriber) => {
      const source = new EventSource(
        `${environment.apiUrl}/orders/${encodeURIComponent(orderId)}/events`,
        { withCredentials: true },
      );
      source.addEventListener('order.status_changed', (event: Event) => {
        try {
          subscriber.next(parseEvent(event as MessageEvent<string>));
        } catch (error) {
          subscriber.error(error);
          source.close();
        }
      });
      source.onerror = () => {
        if (source.readyState === EventSource.CLOSED) {
          subscriber.error(new Error('The work-order event stream closed.'));
        }
      };
      return () => source.close();
    });
  }

  publish(event: WorkOrderStatusEvent): void {
    if (environment.mockMode) {
      this.localEvents.next(event);
      this.channel?.postMessage(event);
    }
  }
}

function isStatusEvent(value: unknown): value is WorkOrderStatusEvent {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('id' in value) ||
    !('orderId' in value) ||
    !('status' in value) ||
    !('occurredAt' in value) ||
    typeof value.id !== 'string' ||
    typeof value.orderId !== 'string' ||
    typeof value.status !== 'string' ||
    typeof value.occurredAt !== 'string'
  ) {
    return false;
  }
  return isWorkOrderStatus(value.status);
}

function parseEvent(event: MessageEvent<string>): WorkOrderStatusEvent {
  const parsed: unknown = JSON.parse(event.data);
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('id' in parsed) ||
    !('orderId' in parsed) ||
    !('status' in parsed) ||
    !('occurredAt' in parsed) ||
    typeof parsed.id !== 'string' ||
    typeof parsed.orderId !== 'string' ||
    typeof parsed.status !== 'string' ||
    typeof parsed.occurredAt !== 'string'
  ) {
    throw new Error('The work-order event payload is invalid.');
  }

  if (!isWorkOrderStatus(parsed.status)) {
    throw new Error('The work-order event contains an unknown status.');
  }

  return {
    id: parsed.id,
    orderId: parsed.orderId,
    status: parsed.status,
    occurredAt: parsed.occurredAt,
  };
}

function isWorkOrderStatus(value: string): value is WorkOrderStatus {
  return [
    'INGRESADA',
    'ASIGNADA',
    'EN_DIAGNOSTICO',
    'EN_REPARACION',
    'ESPERANDO_REPUESTO',
    'FINALIZADA',
    'ENTREGADA',
  ].includes(value);
}
