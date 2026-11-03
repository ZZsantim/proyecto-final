import { UserRole } from './auth/auth.service';

export interface NavigationItem {
  path: string;
  label: string;
}

export const NAVIGATION: Record<UserRole, NavigationItem[]> = {
  CLIENT: [
    { path: '/cliente/mis-citas', label: 'nav.clientHome' },
    { path: '/cliente/agendar/vehiculo-servicio', label: 'nav.booking' },
    { path: '/cliente/reprogramar', label: 'nav.reschedule' },
    { path: '/cliente/registrar-vehiculo', label: 'nav.registerVehicle' },
    { path: '/cliente/historial/V1', label: 'nav.vehicleHistory' },
    { path: '/cliente/encuesta', label: 'nav.survey' },
    { path: '/seguimiento/K7M2QX9P4T', label: 'nav.track' },
  ],
  RECEPTIONIST: [
    { path: '/recepcion/agenda', label: 'nav.schedule' },
    { path: '/recepcion/ingreso', label: 'nav.intake' },
    { path: '/recepcion/registrar-cliente', label: 'nav.registerCustomer' },
    { path: '/recepcion/crear-orden', label: 'nav.workOrders' },
    { path: '/recepcion/caja', label: 'nav.checkout' },
  ],
  MECHANIC: [
    { path: '/mecanico/bahia', label: 'nav.bays' },
    { path: '/mecanico/orden/O1', label: 'nav.orderDetail' },
    { path: '/mecanico/expediente/V8', label: 'nav.technicalFile' },
    { path: '/seguimiento/K7M2QX9P4T', label: 'nav.track' },
  ],
  ADMIN: [
    { path: '/administracion/indicadores', label: 'nav.reports' },
    { path: '/administracion/asignaciones', label: 'nav.assignments' },
    { path: '/administracion/inventario', label: 'nav.inventory' },
    { path: '/administracion/catalogo', label: 'nav.catalog' },
    { path: '/administracion/usuarios', label: 'nav.users' },
    { path: '/administracion/bitacora', label: 'nav.audit' },
  ],
};
