import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  TitleStrategy,
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { authInterceptor } from './core/http/auth.interceptor';
import { correlationInterceptor } from './core/http/correlacion.interceptor';
import { mockInterceptor } from './core/http/mock.interceptor';
import { provideRouteFocus } from './core/ux/foco-ruta';
import { handleViewTransition } from './core/ux/transicion-vista';
import { TranslatedTitleStrategy } from './core/ux/titulo-ruta';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        correlationInterceptor,
        authInterceptor,
        mockInterceptor,
      ]),
    ),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: handleViewTransition,
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideRouteFocus(),
    { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
    provideTranslateService({
      fallbackLang: 'es',
      lang: 'es',
      loader: provideTranslateHttpLoader({
        failOnError: true,
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
    }),
  ],
};
