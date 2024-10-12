import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';  // Import the CookieService
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [CookieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'menandfaith-ng';

  ngOnInit(): void {
    // Initialize the cookie service
    console.log('initialized app component');
  }
}
