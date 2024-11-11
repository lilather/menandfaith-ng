import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserStateService } from './users/services/user-state-service';
import {log} from './decorators/log.decorator'
import {UserService} from './users/services/user.service'
import { IUser } from './users/user.model';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [SharedModule, HttpClientModule,],
})
export class AppComponent implements OnInit {
  currentUser: IUser | null = null;

  constructor(private http: HttpClient, private userService: UserService, @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @log
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log('Current user:', this.currentUser);
      },
      error: (error) => {
        console.error('Error retrieving current user:', error);
      }
    });
  }}
}
