import { Routes } from '@angular/router';
import { screenRoute } from '../core/routing/screen-route';

export const PUBLIC_ORDER_ROUTES: Routes = [
  screenRoute('seguimiento/:trackingCode', 'PU-03'),
  {
    path: 'seguimiento',
    pathMatch: 'full',
    redirectTo: 'seguimiento/K7M2QX9P4T',
  },
];

export const RECEPTION_ORDER_ROUTES: Routes = [
  screenRoute('crear-orden', 'SE-04', ['RECEPTIONIST']),
];

export const MECHANIC_ORDER_ROUTES: Routes = [
  screenRoute('bahia', 'ME-01', ['MECHANIC']),
  screenRoute('orden/:orderId', 'ME-02', ['MECHANIC']),
];

export const ADMIN_ORDER_ROUTES: Routes = [
  screenRoute('asignaciones', 'AD-02', ['ADMIN']),
];
