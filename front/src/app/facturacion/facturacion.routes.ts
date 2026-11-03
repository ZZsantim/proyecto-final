import { Routes } from '@angular/router';
import { screenRoute } from '../core/routing/screen-route';

export const CUSTOMER_BILLING_ROUTES: Routes = [
  screenRoute('encuesta', 'CL-09', ['CLIENT']),
];

export const RECEPTION_BILLING_ROUTES: Routes = [
  screenRoute('caja', 'SE-05', ['RECEPTIONIST']),
];
