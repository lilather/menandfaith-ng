import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export function menAndFaithCookieInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const cookieService = inject(CookieService);  // Use Angular's inject function to get services

  const menandfaithcookie = cookieService.get('menandfaith');  // Retrieve the cookie

  if (menandfaithcookie) {
    console.log(`menandfaith cookie: ${menandfaithcookie}`);  // Log the cookie value
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${menandfaithcookie}`,  // Add the Authorization header
      },
    });
  }
  console.log('Request with headers:', req.headers);  // Log headers

  return next(req);  // Pass the request on to the next handler
}
