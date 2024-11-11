// user-state.service.ts
import { Injectable, signal, computed, effect, inject,  } from '@angular/core';
import { IUser } from '../user.model';
import { toObservable } from '@angular/core/rxjs-interop';
import { UserService } from "./user.service";
import { catchError, of } from 'rxjs';
import { DestroyRef } from '@angular/core';
import { Subject } from 'rxjs';

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

  // Readonly signals to expose state
  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  private _isAuthenticated = false;

  constructor(private userService: UserService) {
    this.checkAndFetchUser();
  }

  // New method to avoid reactive context issues
  private checkAndFetchUser(): void {
    if (!this._user() || !this.isAuthenticated()) {
      this.fetchAndSetUser();
    }
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  // Method to set user data directly (used by AuthService)
  public setUser(user: IUser): void {
    this._user.set(user);
    this._error.set(null);
  }

  // Private method to fetch user data and update signals
  private fetchAndSetUser(): void {
    this._loading.set(true);
    this.userService.getCurrentUser().pipe(
      catchError((error) => {
        console.error('Error fetching user data:', error);
        this._error.set('Failed to load user data.');
        this._loading.set(false);
        return of(null);
      })
    ).subscribe((user) => {
      if (user) {
        this._user.set(user);
        this._error.set(null);
      }
      this._loading.set(false);
    });
  }

  // Method to clear user data (e.g., on logout or unauthorized)
  public clearUser(): void {
    this._user.set(null);
    this._error.set(null);
  }

  /**
   * Get the current user synchronously.
   * Useful for scenarios where reactive access isn't needed.
   * @returns The current user or null if not authenticated
   */
  public getCurrentUserSync(): IUser | null {
    return this._user();
  }

  notifyUnauthorized(): void {
    this.clearUser();
    this.unauthorizedEvent.next(); // Emit an event when unauthorized
  }
  /**
   * Optionally, provide an observable stream of user data.
   * This can be useful for integrating with libraries that expect observables.
   * @returns Observable of IUser or null
   */


}

