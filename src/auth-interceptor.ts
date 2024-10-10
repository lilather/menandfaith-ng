import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from ' ';  // Import the CookieService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}  // Inject CookieService

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from the cookie (not localStorage)
    const token = this.cookieService.get('your-jwt-cookie-name');  // Replace with your actual cookie name

    // If token exists, clone the request and add the token to the headers
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Attach the token to the Authorization header
        }
      });

      // Pass the cloned request instead of the original request to the next handler
      return next.handle(clonedRequest);
    }

    // Pass the original request if no token is available
    return next.handle(req);
  }
}
