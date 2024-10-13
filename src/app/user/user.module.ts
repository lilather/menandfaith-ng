import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AvatarModule } from 'primeng/avatar';  // Import AvatarModule here

// Import PrimeNG modules
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

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
    AvatarModule,
    RouterModule.forChild(routes),  // Add RouterModule with the routes for this module
    CardModule,
    InputTextModule,
    ButtonModule,
    FormsModule  // Add FormsModule for two-way data binding
  ]
})
export class UserModule { }
