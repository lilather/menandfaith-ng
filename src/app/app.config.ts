import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; // Include interceptors
import { provideRouter } from '@angular/router';
import { routes } from './routes';  // Ensure this points to the correct main routing file
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { menAndFaithCookieInterceptor } from './auth/jwt.interceptor';  // Import the cookie interceptor
import { CookieService } from 'ngx-cookie-service';  // Import the CookieService

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),  // Use fetch API
      withInterceptors([menAndFaithCookieInterceptor])  // Add the cookie interceptor
    ),
    CookieService  // Provide the CookieService
  ]
};
