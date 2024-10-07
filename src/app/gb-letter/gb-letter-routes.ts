import { Routes } from '@angular/router';
import { GbLetterHomeComponent } from './gb-letter-home/gb-letter-home.component';
import { GbContentAddComponent } from './gb-content-letter-add/gb-content-letter-add.component';
import { GbTemplateAddComponent } from './gb-template-letter-add/gb-template-letter-add.component';
import  {GbLetterListComponent} from './gb-letter-list/gb-letter-list.component';
import { GbTemplateLetterDetailComponent } from './gb-template-letter-detail/gb-template-detail.component';
import { GbContentLetterDetailComponent } from './gb-content-letter-detail/gb-content-letter-detail.component';
export const gbLetterRoutes: Routes = [    
    { path: '', component: GbLetterHomeComponent },
    { path: 'content-letter-add', component: GbContentAddComponent },
    { path: 'template-letter-add', component: GbTemplateAddComponent },
    { path: 'gb-list/:mode', component: GbLetterListComponent }, // Add mode parameter here
    { path: 'gb-list/content-detail/:id', component: GbContentLetterDetailComponent},
    { path: 'gb-list/template-detail/:id', component: GbTemplateLetterDetailComponent}
  ];