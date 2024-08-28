import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GbLetterModule } from './gb-letter/gb-letter.module'; // Import the feature module for the Goodbye Letter functionality
// Define root routes
// Define root routes
const appRoutes: Routes = [
    { path: '', redirectTo: 'goodbye-letter', pathMatch: 'full' }, // Default route redirect
    // Other potential root-level routes can be defined here
    { path: 'goodbye-letter', loadChildren: () => import('./gb-letter/gb-letter.module').then(m => m.GbLetterModule) } // Lazy loading the feature module
  ];

@NgModule({
  declarations: [
    AppComponent, // Declare the root component
    // Other root-level components can be declared here
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes), // Configure root-level routes using RouterModule.forRoot
  ],
  providers: [],
  bootstrap: [AppComponent] // Specify the root component to bootstrap
})
export class AppModule { }
