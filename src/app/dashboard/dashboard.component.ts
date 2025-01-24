import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import {WelcomeMessageComponent} from '../shared/welcome-message/welcome-message.component'
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    WelcomeMessageComponent,
    SidebarComponent,
    RouterModule,
    ButtonModule,     // Import ButtonModule for <p-button>
    PanelModule,      // Import PanelModule for <p-panel>
    CardModule        // Import CardModule for <p-card>
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent   {
  constructor(private router: Router) {}

    // Attempt to fetch or check user on init

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}



