import { Routes } from '@angular/router';
import { roleGuard } from './core/auth/rol.guard';
import { AUDIT_ROUTES } from './auditoria/auditoria.routes';
import { CATALOG_ROUTES } from './catalogo/catalogo.routes';
import {
  CLIENT_AGENDA_ROUTES,
  RECEPTION_AGENDA_ROUTES,
} from './agenda/agenda.routes';
import {
  CUSTOMER_VEHICLE_ROUTES,
  MECHANIC_VEHICLE_ROUTES,
  RECEPTION_VEHICLE_ROUTES,
} from './clientes-vehiculos/clientes-vehiculos.routes';
import {
  CUSTOMER_BILLING_ROUTES,
  RECEPTION_BILLING_ROUTES,
} from './facturacion/facturacion.routes';
import { IDENTITY_ROUTES } from './identidad/identidad.routes';
import { INVENTORY_ROUTES } from './inventario/inventario.routes';
import {
  ADMIN_ORDER_ROUTES,
  MECHANIC_ORDER_ROUTES,
  PUBLIC_ORDER_ROUTES,
  RECEPTION_ORDER_ROUTES,
} from './ordenes/ordenes.routes';
import { REPORT_ROUTES } from './reportes/reportes.routes';

export const routes: Routes = [
  ...IDENTITY_ROUTES,
  ...PUBLIC_ORDER_ROUTES,
  {
    path: 'cliente',
    canActivateChild: [roleGuard],
    children: [
      ...CLIENT_AGENDA_ROUTES,
      ...CUSTOMER_VEHICLE_ROUTES,
      ...CUSTOMER_BILLING_ROUTES,
    ],
  },
  {
    path: 'recepcion',
    canActivateChild: [roleGuard],
    children: [
      ...RECEPTION_AGENDA_ROUTES,
      ...RECEPTION_VEHICLE_ROUTES,
      ...RECEPTION_ORDER_ROUTES,
      ...RECEPTION_BILLING_ROUTES,
    ],
  },
  {
    path: 'mecanico',
    canActivateChild: [roleGuard],
    children: [...MECHANIC_ORDER_ROUTES, ...MECHANIC_VEHICLE_ROUTES],
  },
  {
    path: 'administracion',
    canActivateChild: [roleGuard],
    children: [
      ...REPORT_ROUTES,
      ...ADMIN_ORDER_ROUTES,
      ...INVENTORY_ROUTES,
      ...CATALOG_ROUTES,
      ...AUDIT_ROUTES,
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'iniciar-sesion' },
  { path: '**', redirectTo: 'iniciar-sesion' },
];
