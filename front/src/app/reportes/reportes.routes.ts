import { Routes } from '@angular/router';
import { screenRoute } from '../core/routing/screen-route';

export const REPORT_ROUTES: Routes = [
  screenRoute('indicadores', 'AD-01', ['ADMIN']),
];
