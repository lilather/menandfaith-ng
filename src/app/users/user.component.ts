// user.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserStateService } from './services/user-state-service';  // Adjust path
import { IUser } from './user.model';
import {log} from '../decorators/log.decorator';
import {UserService} from './services/user.service';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  currentUser: IUser | null = null;
  isEditMode = false;
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}
@log
  ngOnInit(): void {
  }

  // Check the store first, and load from API if needed
  @log
  checkUserStore(): void {
    const currentUser = this.userService.getCurrentUser();
    console.log(`this is the currentr user from checkstore in the user component  ${currentUser}`)
  }
}



