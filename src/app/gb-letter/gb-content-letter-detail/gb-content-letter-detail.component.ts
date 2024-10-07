import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { LetterStateService } from '../services/gb-letter-state-service'; // Import the service that handles state and API calls
import { ContentLetter } from '../models'; // Import the ContentLetter model interface
import { tap, catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-gb-content-letter-detail',
  templateUrl: './gb-content-letter-detail.html',
  styleUrls: ['./gb-content-letter-detail.scss']
})
export class GbContentLetterDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription(); // Manages subscriptions to avoid memory leaks
  isChanged: boolean = false; // Track if there are any changes
  
  letter: ContentLetter = {
    id: '',
    subject: '',
    userId: '',
    content: '',
    createdDate: new Date(),
    lastModifiedDate: new Date(),
    signature: '',
    draft: false
  };
  constructor(
    private router: Router, // Inject Angular Router for navigation

    private route: ActivatedRoute, // ActivatedRoute to access route parameters
    private letterStateService: LetterStateService // Service to fetch and manage letter data
  ) {}

  ngOnInit(): void {
    // Extract the letter ID from the route parameters
    const letterId = this.route.snapshot.paramMap.get('id');

    if (letterId) {
      // If a letter ID is provided in the route, attempt to fetch the letter by ID
      const sub = this.letterStateService.getContentLetterById(letterId).pipe(
        // Use tap to immediately set the letter if found
        tap((letter) => {
          if (letter) {
            this.letter = letter; // Assign the found letter to the component's letter property
          }
        }),
        switchMap((letter) => {
          // If the letter is not found, attempt to load all content letters
          if (!letter) {
            // This switchMap cancels the previous subscription if a new one starts,
            // ensuring that only the latest data stream is active.
            return this.letterStateService.contentLetters$.pipe(
              tap((loadedLetters) => {
                // After loading all letters, find the one with the matching ID
                this.letter = loadedLetters.find(l => l.id === letterId) || this.letter;
              })
            );
          }
          return of(letter); // If the letter was found initially, return it wrapped in an observable
        }),
        catchError((error) => {
          // Handle any errors that occur during the fetch or processing
          console.error('Error fetching or loading content letters:', error);
          return of(null); // Return null to indicate failure gracefully
        })
      ).subscribe();

      // Add the subscription to the subscription manager for cleanup
      this.subscription.add(sub);
    }
  }
  onInputChange(): void {
    this.isChanged = true; // Set the flag to true whenever there is a change
    this.letter.lastModifiedDate = new Date(); // Update the last modified date
  }

  saveChanges(): void {
    // Update the template letter using the service
    this.letterStateService.updateTemplateLetter(this.letter);

    this.isChanged = false; // Reset the change tracking flag after saving
  }
  backToList(): void {
    this.router.navigate(['/gb-list']); // Navigate back to the list of letters
  }

  deleteLetter(): void {
    this.letterStateService.deleteContentLetter(this.letter.id); // Call service method to delete
    this.router.navigate(['/gb-list']); // Navigate back to the list after deletion
  }
  ngOnDestroy(): void {
    // Clean up all subscriptions when the component is destroyed to avoid memory leaks
    this.subscription.unsubscribe();
  }
}
