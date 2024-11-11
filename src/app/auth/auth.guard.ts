import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserStateService } from '../users/services/user-state-service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userStateService = inject(UserStateService);

  // Check if the user is authenticated
  if (!userStateService.isAuthenticated()) {
    // Trigger the unauthorized event if not authenticated
    userStateService.notifyUnauthorized();
    return false;
  }

  return true;  // Allow access if authenticated
};
