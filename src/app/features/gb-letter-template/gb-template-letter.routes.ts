import { Routes } from '@angular/router';
import { GbTemplateLetterHomeComponent } from './gb-template-home/gb-template-letter-home.component';
import { GbTemplateLetterDetailComponent } from './gb-template-letter-detail/gb-template-detail.component';
import { GbTemplateAddComponent } from './gb-template-letter-add/gb-template-letter-add.component';



export const gbTemplateLetterRoutes: Routes = [
  { path: '', component: GbTemplateLetterHomeComponent },
  { path: 'letter-detail/:id', component: GbTemplateLetterDetailComponent },
  { path: 'letter-add', component: GbTemplateAddComponent },
];
