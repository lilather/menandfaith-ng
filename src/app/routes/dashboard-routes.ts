import { DashboardComponent } from "../dashboard/dashboard.component";
import { Routes } from "@angular/router";
import { AuthGuard } from '../auth/auth.guard'; // Adjust the path as necessary

export const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate: [AuthGuard], // Protect the route with the Auth
  },
];
