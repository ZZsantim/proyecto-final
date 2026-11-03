import { Route } from '@angular/router';
import { UserRole } from '../auth/auth.service';

export type ScreenId =
  | 'PU-01'
  | 'PU-02'
  | 'PU-03'
  | 'CL-01'
  | 'CL-02'
  | 'CL-03'
  | 'CL-04'
  | 'CL-05'
  | 'CL-06'
  | 'CL-07'
  | 'CL-08'
  | 'CL-09'
  | 'SE-01'
  | 'SE-02'
  | 'SE-03'
  | 'SE-04'
  | 'SE-05'
  | 'ME-01'
  | 'ME-02'
  | 'ME-03'
  | 'AD-01'
  | 'AD-02'
  | 'AD-03'
  | 'AD-04'
  | 'AD-05'
  | 'AD-06';

export function screenRoute(path: string, screenId: ScreenId, roles: UserRole[] = []): Route {
  return {
    path,
    loadComponent: () =>
      import('../../pantallas/portal/portal-page').then((module) => module.PortalPageComponent),
    data: { screenId, roles },
    title: `pages.${screenId}.title`,
  };
}
