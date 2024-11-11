// jwt.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {log} from '../decorators/log.decorator';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
  ) {
  }

  @log
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.error('Intercepting request:', req);
    const token = this.cookieService.get('menandfaith');
    if (token) {
      console.error('Token found:', token);
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    } else {
    }

    return next.handle(req);
  }
}
