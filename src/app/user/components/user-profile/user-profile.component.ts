import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Adjust the path as necessary

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any = {};  // Store user data here

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('Fetching user data...');
    this.userService.getUser().then((data) => {
      this.user = data;
      console.log('User data fetched:', this.user);
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }
}
