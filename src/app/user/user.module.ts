import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './components/user-profile/user-profile.component'; // Adjust the path as necessary

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
  }
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)  // Add RouterModule with the routes for this module
  ]
})
export class UserModule { }
