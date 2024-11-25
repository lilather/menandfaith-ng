import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { featureRoutes } from '../routes/feature-routes';
import {CommonModule} from "@angular/common";
import {SidebarComponent} from "../sidebar/sidebar.component";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  routeCards: { title: string; description: string; path: string; icon:string }[] = [];

  constructor(private router: Router) {}
  ngOnInit(): void {
   this.routeCards = featureRoutes.map(route => ({
      title: route.data?.['title'],      // Extract title from route data
      description: route.data?.['description'],
      icon: route.data?.['icon'],
      // Extract description from route data
      path: route.path!                   // Extract path from route
    }));


  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}
