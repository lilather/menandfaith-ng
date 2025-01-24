import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { featureRoutes } from './../../routes/feature-routes';
import { CommonModule } from '@angular/common';
import { countService } from 'src/app/count.service';
import {WelcomeMessageComponent} from "../../shared/welcome-message/welcome-message.component"; // Adjust path
import { UserStateService } from './../../users/services/user-state-service';
import { IUser } from './../../users/user.model';
import {PrimeTemplate} from "primeng/api";
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  selector: 'app-dashboard-home',
    imports: [CommonModule, WelcomeMessageComponent, PrimeTemplate, CardModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  // Optionally store a separate letterCount if you want
  letterCount?: number;
  currentUser: IUser | null = null;

// Import the UserStateService

  // The array of cards we display
  routeCards: Array<{
    title: string;
    description: string;
    path: string;
    icon: string;
    count?: number; // optional property
  }> = [];

  // Use Angular's inject() or constructor injection for the service
  private countsService = inject(countService);

  constructor(private router: Router, private userStateService:UserStateService) {}

  ngOnInit(): void {
    this.userStateService.checkAndFetchUser()
      .then(() => {
        // Once fetched, retrieve the current user from the state
        this.currentUser = this.userStateService.getCurrentUser();
      }).then(() => { console.log(`this is the current user ${this.currentUser}`) });

    // 1) Map routes -> routeCards
    this.routeCards = featureRoutes.map(route => ({
      title: route.data?.['title'] ?? '',
      description: route.data?.['description'] ?? '',
      icon: route.data?.['icon'] ?? '',
      path: route.path ?? ''
    }));

    // 2) Call the counts service
    this.countsService.getAllCounts().subscribe((res) => {
      // Example: res = { letterCount: 3 }
      this.letterCount = res.letterCount; // Store if you want

      // 3) If you want to attach the count to a specific card
      this.routeCards = this.routeCards.map((card) => {
        if (card.title === 'Goodbye Letter') {
          // Or whatever title / data key matches
          card.count = res.letterCount;
        }
        return card;
      });
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
