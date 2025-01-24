import { Routes } from '@angular/router';
import { GbTemplateLetterDetailComponent } from './gb-letter-template/gb-template-letter-detail/gb-template-detail.component';
import { GbTemplateAddComponent } from './gb-letter-template/gb-template-letter-add/gb-template-letter-add.component';
import { GbContentLetterDetailComponent } from './gb-letter-content/gb-content-letter-detail/gb-content-letter-detail.component';
import { GbContentAddComponent } from './gb-letter-content/gb-content-letter-add/gb-content-letter-add.component';
import { GbLetterHomeComponent } from './gb-letter-home.component';

export const gbLetterRoutes: Routes = [
  { path: '', component: GbLetterHomeComponent },

  // Template routes
  { path: 'template/letter-detail/:id', component: GbTemplateLetterDetailComponent },
  { path: 'template/letter-add', component: GbTemplateAddComponent },

  // Content routes
  { path: 'content/letter-detail/:id', component: GbContentLetterDetailComponent },
  { path: 'content/letter-add', component: GbContentAddComponent },
];


