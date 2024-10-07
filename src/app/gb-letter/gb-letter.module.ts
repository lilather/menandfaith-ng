import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { RouterModule, Routes } from '@angular/router';
import { GbLetterHomeComponent } from './gb-letter-home/gb-letter-home.component';
import { GbContentAddComponent } from './gb-content-letter-add/gb-content-letter-add.component';
import { GbTemplateAddComponent } from './gb-template-letter-add/gb-template-letter-add.component';
import { gbLetterRoutes } from './gb-letter-routes';
import { GbLetterListComponent } from './gb-letter-list/gb-letter-list.component';
import { GbTemplateLetterDetailComponent } from './gb-template-letter-detail/gb-template-detail.component';
import { GbContentLetterDetailComponent } from './gb-content-letter-detail/gb-content-letter-detail.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    GbLetterHomeComponent,
    GbContentAddComponent,
    GbTemplateAddComponent,                    
    GbLetterListComponent,
    GbTemplateLetterDetailComponent,
    GbContentLetterDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule, // Ensure ReactiveFormsModule is imported
    RouterModule.forChild(gbLetterRoutes) // Configure routes

  ],
 
})
export class GbLetterModule {}
