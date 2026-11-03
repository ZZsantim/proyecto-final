import { Routes } from '@angular/router';
import { screenRoute } from '../core/routing/screen-route';

export const CUSTOMER_VEHICLE_ROUTES: Routes = [
  screenRoute('registrar-vehiculo', 'CL-07', ['CLIENT']),
  screenRoute('historial/:vehicleId', 'CL-08', ['CLIENT']),
];

export const RECEPTION_VEHICLE_ROUTES: Routes = [
  screenRoute('registrar-cliente', 'SE-03', ['RECEPTIONIST']),
];

export const MECHANIC_VEHICLE_ROUTES: Routes = [
  screenRoute('expediente/:vehicleId', 'ME-03', ['MECHANIC']),
];
