import { DOCUMENT } from '@angular/common';
import { Component, HostListener, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  TitleStrategy,
} from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import { AuthService } from './core/auth/auth.service';
import { NAVIGATION } from './core/navigation';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TranslatePipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly translations = inject(TranslateService);
  private readonly titleStrategy = inject(TitleStrategy);
  private readonly document = inject(DOCUMENT);
  private readonly navigationEnd = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ),
    { initialValue: null },
  );

  protected readonly user = this.auth.user;
  protected readonly menuOpen = signal(false);
  protected readonly navigation = computed(() => {
    const role = this.user()?.role;
    return role ? NAVIGATION[role] : [];
  });
  protected readonly language = toSignal(
    this.translations.onLangChange.pipe(map((event) => event.lang)),
    { initialValue: this.translations.getCurrentLang() ?? 'es' },
  );

  constructor() {
    effect(() => {
      this.navigationEnd();
      this.language();
      this.titleStrategy.updateTitle(this.router.routerState.snapshot);
    });
  }

  protected toggleLanguage(): void {
    const nextLanguage = this.language() === 'es' ? 'en' : 'es';
    this.translations.use(nextLanguage);
    this.document.documentElement.lang = nextLanguage;
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected logout(): void {
    this.closeMenu();
    this.auth.logout();
    this.router.navigateByUrl('/iniciar-sesion');
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }
}
