import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = TestBed.inject(AuthService);
  });

  it('signs in with an active demo account and keeps the token in memory', () => {
    expect(service.login('cliente1@electrostock.test', 'Cliente2026!')).toBe(
      'success',
    );
    expect(service.user()?.role).toBe('CLIENT');
    expect(service.token()).toContain('demo-U6-');
  });

  it('rejects inactive and invalid accounts distinctly', () => {
    expect(service.login('mecanico3@electrostock.test', 'Meca2026!c')).toBe(
      'inactive',
    );
    expect(service.login('nobody@electrostock.test', 'wrong')).toBe('invalid');
  });

  it('clears the session on sign out', () => {
    service.login('admin@electrostock.test', 'Admin2026!');
    service.logout();
    expect(service.user()).toBeNull();
    expect(service.token()).toBeNull();
  });
});
