// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';  // Import the appConfig

bootstrapApplication(AppComponent, {
  providers: [...appConfig.providers]
});
