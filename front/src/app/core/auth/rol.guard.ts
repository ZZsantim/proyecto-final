import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from './auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const allowedRoles = route.data['roles'] as UserRole[] | undefined;
  const user = auth.user();

  if (!user) {
    return router.createUrlTree(['/iniciar-sesion']);
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return router.createUrlTree([homeForRole(user.role)]);
  }

  return true;
};

function homeForRole(role: UserRole): string {
  switch (role) {
    case 'CLIENT':
      return '/cliente/mis-citas';
    case 'RECEPTIONIST':
      return '/recepcion/agenda';
    case 'MECHANIC':
      return '/mecanico/bahia';
    case 'ADMIN':
      return '/administracion/indicadores';
  }
}
