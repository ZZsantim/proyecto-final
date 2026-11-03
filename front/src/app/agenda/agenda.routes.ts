import { Routes } from '@angular/router';
import { screenRoute } from '../core/routing/screen-route';

export const CLIENT_AGENDA_ROUTES: Routes = [
  screenRoute('mis-citas', 'CL-01', ['CLIENT']),
  {
    path: 'agendar',
    children: [
      screenRoute('vehiculo-servicio', 'CL-02', ['CLIENT']),
      screenRoute('dia', 'CL-03', ['CLIENT']),
      screenRoute('hora', 'CL-04', ['CLIENT']),
      screenRoute('confirmar', 'CL-05', ['CLIENT']),
    ],
  },
  screenRoute('reprogramar', 'CL-06', ['CLIENT']),
];

export const RECEPTION_AGENDA_ROUTES: Routes = [
  screenRoute('agenda', 'SE-01', ['RECEPTIONIST']),
  screenRoute('ingreso', 'SE-02', ['RECEPTIONIST']),
];
