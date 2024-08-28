import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import for HttpClient with fetch

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()) // Adding HttpClient with fetch API configuration
  ]
};
