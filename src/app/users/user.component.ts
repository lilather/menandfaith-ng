import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For form handling
import { UserService } from './services/user.service';  // Adjust the path to your service
import { IUser, UpdateUserDto } from './user.model'; // Adjust the path to your models
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true, // This makes it a standalone component
  imports: [CommonModule, FormsModule], // Importing common Angular modules
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  currentUser$!: Observable<IUser>;  // Store the current user as an observable
  isEditMode = false;  // Toggle for showing edit mode
  userForm: Partial<IUser> = {};  // Form model for editing the user

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      currentUser => {
        console.log('Current User from API:', currentUser);  // Logs the actual user data
      },
      error => {
        console.error('Error fetching current user:', error);  // Logs any error that occurred
      }
    );
  }
  // Get current user from the server, no need for explicit user ID
  getCurrentUser(): void {
   this.userService.getCurrentUser();  // Call the service to get the current user
  }

  getUserById(id: string): void {
 // Call getUserById on UserService with the user ID
    this.userService.getUserById(id).subscribe((user: IUser) => {
      // Handle the user data as needed
    })
}


  // Enable editing mode with current user data
  enableEdit(user: IUser): void {
    this.isEditMode = true;
    this.userForm = { ...user };  // Populate the form with the current user's details
  }

  // Update user details
  updateUser(): void {
    if (this.userForm) {
      const updateUserDto: UpdateUserDto = {
        firstName: this.userForm.firstName,
        lastName: this.userForm.lastName,
        email: this.userForm.email
        // Add other fields as needed
      };

      // Call updateUser on UserService without passing the ID (NestJS should handle the current user)
      this.userService.updateUser(updateUserDto).subscribe(() => {
        this.isEditMode = false;
        this.getCurrentUser();  // Reload the current user after the update
      });
    }
  }

  // Delete the current user
  deleteUser(): void {
    // No need to pass user ID, as NestJS will handle the current user deletion logic
    this.userService.deleteUser().subscribe(() => {
      // Handle the user deletion logic, e.g., redirect or show a success message
    });
  }
}
