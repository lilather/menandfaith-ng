import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../enviroments/environment';
import { AuthService } from './auth.service';
import {log} from '../decorators/log.decorator';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  @log
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status===400){
          console.error('Bad request:', error);
        }
        // Error handling logic for specific HTTP errors
        if (error.status === 401 || error.status === 403) {
          console.error('Unauthorized request:', error);
         this.authService.handleUnauthorized();
        } else if (error.status === 500) {
          window.location.href = environment.WORDPRESS_ERROR_URL;
        } else if (error.status === 0) {
          window.location.href = environment.WORDPRESS_ERROR_URL;
        }

        // Re-throw the error with debug information
        return throwError(() => error);
      })
    );

  }
}
