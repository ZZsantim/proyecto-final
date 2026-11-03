import {
  DOCUMENT,
} from '@angular/common';
import {
  DestroyRef,
  EnvironmentProviders,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, skip } from 'rxjs';

export function provideRouteFocus(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const router = inject(Router);
    const document = inject(DOCUMENT);
    const destroyRef = inject(DestroyRef);

    router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        skip(1),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe(() => {
        document.defaultView?.requestAnimationFrame(() => {
          document
            .querySelector<HTMLElement>('[data-vista] h1')
            ?.focus({ preventScroll: true });
        });
      });
  });
}
