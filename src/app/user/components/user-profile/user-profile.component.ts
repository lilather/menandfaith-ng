import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Adjust the path as necessary
import { StoreService } from '../../../store/store.service';  // Import StoreService

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any = {};  // Store user data here

  constructor(private userService: UserService, private storeService: StoreService) { }

  ngOnInit(): void {
    // Check if user data exists in the store
    const storedUser = this.storeService.getUserValue();

    if (storedUser) {
      // If user data exists in the store, use it
      this.user = storedUser;
      console.log('User data from store:', this.user);
    } else {
      // If no user data in the store, call the UserService to fetch it
      console.log('No user data available in store. Fetching from API...');
      this.userService.getUser();  // Fetch user data from the API
    }

    // Subscribe to the user$ observable to get updates when the user data changes
    this.storeService.user$.subscribe({
      next: (userData) => {
        if (userData) {
          this.user = userData;
          console.log('User data updated from store:', this.user);
        }
      },
      error: (err) => {
        console.error('Error getting user data:', err);
      }
    });
  }
}
