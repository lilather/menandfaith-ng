import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { userRoutes } from '../app/routes/user.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CookieService } from 'ngx-cookie-service';
import { dashboardRoutes } from './routes/dashboard-routes';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { AuthErrorInterceptor } from './auth/auth-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api'; // Import ConfirmationService

const routes = [...userRoutes, ...dashboardRoutes];

export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthErrorInterceptor,
      multi: true
    },
    ConfirmationService
  ]
};

