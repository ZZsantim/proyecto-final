import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, of, throwError } from 'rxjs';
import fixture from '../../../assets/fixtures/test-data.json';
import { environment } from '../config/entorno';
import { DemoStore } from '../demo/demo-store.service';

export const mockInterceptor: HttpInterceptorFn = (request, next) => {
  if (
    !environment.mockMode ||
    !request.url.startsWith(`${environment.apiUrl}/`)
  ) {
    return next(request);
  }

  const store = inject(DemoStore);
  const endpoint = request.url.split('?')[0];
  let body: unknown;

  if (request.method === 'GET' && endpoint === '/api/v1/health') {
    body = { status: 'ok', mode: 'demo' };
  } else if (
    request.method === 'GET' &&
    endpoint === '/api/v1/scheduling/appointments'
  ) {
    body = store.appointments();
  } else if (request.method === 'POST' && endpoint === '/api/v1/scheduling/appointments') {
    body = request.body;
  } else if (
    request.method === 'GET' &&
    endpoint === '/api/v1/work-orders'
  ) {
    body = store.orders();
  } else if (request.method === 'GET' && endpoint === '/api/v1/fixtures') {
    body = fixture;
  } else {
    return throwError(
      () =>
        new HttpErrorResponse({
          status: 404,
          statusText: 'Not Found',
          url: request.url,
          error: {
            title: 'Mock endpoint not found',
            detail: `No demo response is defined for ${request.method} ${endpoint}.`,
            status: 404,
          },
        }),
    ).pipe(delay(150));
  }

  return of(new HttpResponse({ body, status: 200, url: request.url })).pipe(
    delay(150),
  );
};
