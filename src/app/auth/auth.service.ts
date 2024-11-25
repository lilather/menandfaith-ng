// auth.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { environment } from '../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { log } from '../decorators/log.decorator';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
  ) {}



  @log
  handleUnauthorized(): void {
    this.redirectToLogin();
  }



  @log
  redirectToLogin(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.location.href = environment.WORDPRESS_LOGIN_URL;
    }
  }
}

