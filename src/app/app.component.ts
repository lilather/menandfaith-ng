import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user/services/user.service';
import { StoreService } from './store/store.service';  // Import StoreService
import {User} from './user/interfaces/user.interface';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'menandfaith-ng';
  user: any;  // To hold the user data

  constructor(private userService: UserService, private storeService: StoreService) { }

  async ngOnInit(): Promise<void> {
    // Check if user data already exists in the store
    const storedUser = this.storeService.getUserValue();

    if (storedUser) {
      this.user = storedUser;
      console.log('User data already exists:', this.user);
    } else {
      try {
        // Use the Promise-based getUser() method
        const userData = await this.userService.getUser();

        if (userData && typeof userData !== 'number') {
          // Store the fetched user data in the StoreService
          this.storeService.setUser(userData);
          this.user = userData;
          console.log('User data in store:', this.storeService.getUserValue());
        } else {
          console.error(`Failed to fetch user data. Status code: ${userData}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    // Subscribe to user data changes in the store
    this.storeService.user$.subscribe((user) => {
      this.user = user;
      console.log('User data updated in store:', this.user);
    });
  }

    // Subscribe to user data changes in the store
 
}
