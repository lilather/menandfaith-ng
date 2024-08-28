import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { RouterModule, Routes } from '@angular/router';
import { GbLetterAddContentComponent } from './gb-content-letter-add/gb.-content-letter-add.component';
import { GbTemplateLetterAddComponent } from './gb-template-letter-add/gb-template-letter-add.component';
import { GbLetterHomeComponent } from './gb-letter-home/gb-letter-home.component';
import { GbLetterListComponent } from './gb-letter-list/gb-letter-list.component';
import { GbContentLetterDetailComponent } from './gb-content-letter-detail/gb-content-letter-detail.component';
import { GbTemplateLetterDetailComponent } from './gb-template-letter-detail/gb-template-letter-detail.component'

const routes: Routes = [
  { path: 'goodbye-letter-add', component: GbLetterAddContentComponent },
  { path: '', component: GbLetterHomeComponent },
  { path: 'goodbye-letter-list', component: GbLetterListComponent },
  { path: 'goodbye-letter-content/:id', component: GbContentLetterDetailComponent },
  { path: 'goodbye-letter-template/:id', component: GbTemplateLetterDetailComponent },
  { path: 'goodbye-letter-template-add', component: GbTemplateLetterAddComponent}

];

@NgModule({
  declarations: [
    GbLetterAddContentComponent,
    GbLetterHomeComponent,
    GbLetterListComponent,
    GbContentLetterDetailComponent,
    GbTemplateLetterDetailComponent,
    GbTemplateLetterAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Ensure ReactiveFormsModule is imported

    RouterModule.forChild(routes) // Use RouterModule.forChild for feature-level routing
  ],
  exports: []
})
export class GbLetterModule { }
