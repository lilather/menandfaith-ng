
import { Routes } from '@angular/router';
import { GbContentLetterHomeComponent } from './gb-content-home/gb-content-letter-home.component';
import { GbContentLetterDetailComponent } from './gb-content-letter-detail/gb-content-letter-detail.component';
import { GbContentAddComponent } from './gb-content-letter-add/gb-content-letter-add.component';



export const gbContentLetterRoutes: Routes = [
  { path: '', component: GbContentLetterHomeComponent },
  { path: 'letter-detail/:id', component: GbContentLetterDetailComponent },
  { path: 'letter-add', component: GbContentAddComponent },
];
