import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
export const featureRoutes: Routes = [
  {
    path: 'goodbye-letter',
    loadChildren: () =>
      import('../features/gb-letter/gb-letter.routes').then(
        (m) => m.gbLetterRoutes
      ),
    data: {
      title: 'Goodbye Letter',
      description: 'Break free: say goodbye to addictions and curses for good.',
      icon: 'https://placeholder.com/100',
// Placeholder icon link
    },
    canActivate: [AuthGuard], // Protect the route with AuthGuard
  },
];
