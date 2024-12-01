import { Component, OnInit, effect} from '@angular/core';
import {UserStateService} from '../users/services/user-state-service';
import {IUser} from '../users/user.model';
import { Observable } from 'rxjs';
import {AsyncPipe} from "@angular/common";
import {CommonModule} from "@angular/common";
@Component({
    standalone: true,
    selector: 'app-sidebar',
    imports: [
        AsyncPipe,
        CommonModule
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent  {
  user$: Observable<IUser | null>;

  constructor(private userStateService: UserStateService)
  {
    this.user$ = this.userStateService.getUserObservable(); // Retrieve the user data as an observable

  }


}
