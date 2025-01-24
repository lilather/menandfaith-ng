import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {IUser} from '../user.model';
import {UserService} from "./user.service";
import {firstValueFrom, Subject} from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private destroyRef = inject(DestroyRef);
  unauthorizedEvent = new Subject<void>(); // New Subject for unauthorized events

  // Signals to hold user state
  private _user = signal<IUser | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _isAuthenticated = false;

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private userService: UserService) {}

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  public setUser(user: IUser): void {
    this._user.set(user);
    this._error.set(null);
  }

  public async checkAndFetchUser(): Promise<void> {
    if (!this._user()) {
      await this.fetchAndSetUser();
    }
  }

  private async fetchAndSetUser(): Promise<void> {
    console.time('fetchAndSetUser Time'); // Start timer

    this._loading.set(true);
    try {
      const user = await firstValueFrom(this.userService.getCurrentUser());
      if (user) {
        this.setUser(user);
        console.time(`User fetched:, ${user}`);
        this._isAuthenticated = true;
        this._error.set(null);
        this.getCurrentUser()
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      this._error.set('Failed to fetch user');
      this.notifyUnauthorized();
    } finally {
      this._loading.set(false);
      console.timeEnd('fetchAndSetUser Time'); // End timer and log elapsed time

    }
  }

  public clearUser(): void {
    this._user.set(null);
    this._isAuthenticated = false;
    this._error.set(null);
  }

  public getCurrentUser(): IUser | null {
    return this._user();
  }

  public getUserObservable() {
    return toObservable(this.user);
  }

  notifyUnauthorized(): void {
    this.clearUser();
    this.unauthorizedEvent.next();
  }
}
