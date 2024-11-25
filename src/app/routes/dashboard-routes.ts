import { DashboardComponent } from "../dashboard/dashboard.component";
import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
