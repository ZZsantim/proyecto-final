import { Routes } from '@angular/router';
import { screenRoute } from '../core/routing/screen-route';

export const CATALOG_ROUTES: Routes = [
  screenRoute('catalogo', 'AD-04', ['ADMIN']),
];
