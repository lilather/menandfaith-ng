import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserStateService } from '../users/services/user-state-service';

export const AuthGuard: CanActivateFn = (route, state) => {
  return true;  // Allow access if authenticated
};
