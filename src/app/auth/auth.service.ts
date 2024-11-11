// auth.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { environment } from './../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UserStateService } from './../users/services/user-state-service';
import { log } from '../decorators/log.decorator';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userStateService: UserStateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.userStateService.unauthorizedEvent.subscribe(() => {
      this.handleUnauthorized();
    });

  }

  @log
  handleUnauthorized(): void {
    this.userStateService.clearUser();
    this.redirectToLogin();
  }



  @log
  redirectToLogin(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.location.href = environment.WORDPRESS_LOGIN_URL;
    }
  }
}

