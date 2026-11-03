import { Routes } from '@angular/router';
import { screenRoute } from '../core/routing/screen-route';

export const IDENTITY_ROUTES: Routes = [
  screenRoute('iniciar-sesion', 'PU-01'),
  screenRoute('crear-cuenta', 'PU-02'),
];
