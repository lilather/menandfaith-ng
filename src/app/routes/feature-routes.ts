import { Routes } from '@angular/router';
import {gbContentLetterRoutes} from "../features/gb-letter-content/gb-content-letter.routes";
import {gbTemplateLetterRoutes} from "../features/gb-letter-template/gb-template-letter.routes";
import {
  GbContentLetterHomeComponent
} from "../features/gb-letter-content/gb-content-home/gb-content-letter-home.component";
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

  },
  {
    path: 'appreciation-journal',
    loadChildren: () => import('../features/appreciation-journal/appreciation-journal.component').then(m => m.appreciationJournalComponent),
    data: {
      title: 'App Reaction Journal',
      description: 'Log your reactions to various apps.',
      icon: 'https://placeholder.com/100' // Placeholder icon link
    }
  },
  {
    path: 'daily-journal',
    loadChildren: () => import('../features/daily-journal/daily-journal.component').then(m => m.DailyJournalComponent),
    data: {
      title: 'Daily Journal',
      description: 'Keep track of your daily activities and thoughts.',
      icon: 'https://placeholder.com/100' // Placeholder icon link
    }
  },
  {
    path: 'action-plan',
    loadChildren: () => import('../features/action-plan/action-plan.component').then(m => m.ActionPlanComponent),
    data: {
      title: 'Action Plan',
      description: 'Create and manage your action plans.',
      icon: 'https://placeholder.com/100' // Placeholder icon link
    }
  },
  {
    path: 'family-creed',
    loadChildren: () => import('../features/family-creed/family-creed.component').then(m => m.FamilyCreedComponent),
    data: {
      title: 'Family Creed',
      description: 'Create and manage your family creed.',
      icon: 'https://placeholder.com/100' // Placeholder icon link
    }
  }
];
