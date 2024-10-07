// routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'home', redirectTo: 'goodbye-letter', pathMatch: 'full'}, // Redirect to the goodbye-letter route
    { path: 'goodbye-letter', loadChildren: () => import('./gb-letter/gb-letter.module').then(m => m.GbLetterModule) } ,
    {
      
        path: 'users',  // Define the users base route
        children: [
            {
                path: 'current',  // Handle 'users/current' route
                loadComponent: () => import('./users/user.component').then(m => m.UserComponent),  // Lazy load UserComponent
            }
        ]
    
      }
];
