import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module'; // Import the AppModule
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers
  ]
}).catch(err => console.error(err));
