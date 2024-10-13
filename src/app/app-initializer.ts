import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';  // Import the CookieService

export function appInitializer(http: HttpClient): () => Promise<any> {
  return () => {
    return new Promise((resolve, reject) => {

      // HTTP request with credentials included
      http.get('http://localhost:3000/users/current', { withCredentials: true })
        .subscribe({
          next: (data) => {
            console.log('App initialized with data:', data);
            resolve(data);  // Resolve the promise when initialization is done
          },
          error: (error) => {
            console.error('Error during app initialization:', error);
            reject(error);  // Reject in case of error
          }
        });
    });
  };
}
