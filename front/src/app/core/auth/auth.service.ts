import { Injectable, computed, signal } from '@angular/core';
import fixture from '../../../assets/fixtures/test-data.json';

export type UserRole = 'CLIENT' | 'RECEPTIONIST' | 'MECHANIC' | 'ADMIN';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface FixtureUser extends DemoUser {
  password: string;
  active: boolean;
}

function isUserRole(value: string): value is UserRole {
  return [
    'CLIENT',
    'RECEPTIONIST',
    'MECHANIC',
    'ADMIN',
  ].includes(value);
}

function readDemoUsers(): FixtureUser[] {
  return fixture.users.map((user) => {
    if (!isUserRole(user.role)) {
      throw new Error(`Unknown role in demo fixture for user ${user.id}.`);
    }
    return { ...user, role: user.role };
  });
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUser = signal<DemoUser | null>(null);
  private readonly accessToken = signal<string | null>(null);
  private readonly demoUsers = signal<FixtureUser[]>(readDemoUsers());

  readonly user = this.currentUser.asReadonly();
  readonly role = computed(() => this.currentUser()?.role ?? null);
  readonly token = this.accessToken.asReadonly();

  login(email: string, password: string): 'success' | 'inactive' | 'invalid' {
    const user = this.demoUsers().find(
      (candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (!user || user.password !== password) {
      return 'invalid';
    }

    if (!user.active) {
      return 'inactive';
    }

    this.currentUser.set({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    this.accessToken.set(`demo-${user.id}-${Date.now()}`);
    return 'success';
  }

  register(name: string, email: string, password: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();
    if (this.demoUsers().some((user) => user.email.toLowerCase() === normalizedEmail)) {
      return false;
    }

    this.demoUsers.update((users) => [
      ...users,
      {
        id: `U${users.length + 1}`,
        name: name.trim(),
        email: normalizedEmail,
        password,
        role: 'CLIENT',
        active: true,
      },
    ]);
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    this.accessToken.set(null);
  }
}
