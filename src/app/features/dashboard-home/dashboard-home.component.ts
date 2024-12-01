import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {featureRoutes} from "../../routes/feature-routes";
import {CommonModule} from "@angular/common";
@Component({
  standalone: true,
  selector: 'app-dashboard-home',
  imports: [CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
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


  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
