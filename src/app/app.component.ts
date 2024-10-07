import { Component, OnInit } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroment'; // Ensure this path is correct

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [SharedModule],

})
export class AppComponent implements OnInit {
  apiUrl = environment.API_URL;  // Use the API URL from the environment file
  title = 'ng-menandfaith';
  apiStatusMessage: string = ''; // This will hold the status message from the API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.checkApiUrl();  // Check the API status on component initialization
  }

  checkApiUrl(): void {
    // Make a request to the /status endpoint of the API
    this.http.get(`${this.apiUrl}/status`).subscribe({
      next: (response: any) => {
        this.apiStatusMessage = response.status; // Expecting a 'status' field in the response
        console.log(this.apiStatusMessage);  // Log the success message
      },
      error: (err) => {
        this.apiStatusMessage = 'API is not working!';  // Error message if the API call fails
        console.error(this.apiStatusMessage);  // Log the error message
      }
    });
  }
}
