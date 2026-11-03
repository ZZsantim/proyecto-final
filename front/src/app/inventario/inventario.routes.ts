import { Routes } from '@angular/router';
import { screenRoute } from '../core/routing/screen-route';

export const INVENTORY_ROUTES: Routes = [
  screenRoute('inventario', 'AD-03', ['ADMIN']),
];
