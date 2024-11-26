import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { provideAnimations } from "@angular/platform-browser/animations";
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';  // Import the appConfig

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), ...appConfig.providers, NG_EVENT_PLUGINS]
});
