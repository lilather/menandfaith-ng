import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component'; // Main container component
import { DashboardHomeComponent } from '../features/dashboard-home/dashboard-home.component'; // Dashboard home component
import {featureRoutes} from "./feature-routes";

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent, // DashboardComponent as the container
    children: [
      { path: '', component: DashboardHomeComponent },
      ...featureRoutes// Default route for dashboard home
      // Add other child routes here for other dashboard features
      // Example: { path: 'analytics', component: AnalyticsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
