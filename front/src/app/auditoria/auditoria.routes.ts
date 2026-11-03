import { Routes } from '@angular/router';
import { screenRoute } from '../core/routing/screen-route';

export const AUDIT_ROUTES: Routes = [
  screenRoute('usuarios', 'AD-05', ['ADMIN']),
  screenRoute('bitacora', 'AD-06', ['ADMIN']),
];
