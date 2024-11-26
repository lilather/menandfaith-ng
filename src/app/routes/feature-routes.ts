import { Routes } from '@angular/router';
import {AuthGuard} from "../auth/auth.guard";

export const featureRoutes: Routes = [
  {
    path: 'goodbye-letter-content',
    loadChildren: () => import('../features/gb-letter-content/gb-content-letter.routes').then(m => m.gbContentLetterRoutes),
    data: {
      title: 'Goodbye Letter',
      description: 'Create and manage goodbye letters.',
      icon: 'https://placeholder.com/100' // Placeholder icon link
    },
    canActivate: [AuthGuard], // Protect the route with the Auth

  },
  {
    path: 'goodbye-letter-template',
    loadChildren: () => import('../features/gb-letter-template/gb-template-letter.routes').then(m => m.gbTemplateLetterRoutes),
    data: {
      title: 'Goodbye Letter',
      description: 'Create and manage goodbye letters.',
      icon: 'https://placeholder.com/100' // Placeholder icon link
    },
    canActivate: [AuthGuard], // Protect the route with the Auth


  }
];
