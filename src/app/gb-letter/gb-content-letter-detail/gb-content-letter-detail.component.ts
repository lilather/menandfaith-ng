import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LetterStateService } from '../services/gb-letter-state-service'; // Adjust the path
import { ContentLetter } from '../models'; // Adjust the import path

@Component({
  selector: 'app-gb-content-letter-detail',
  template: `
    <div *ngIf="letter; else loading">
      <p>{{ letter.content }}</p>
    </div>
    <ng-template #loading>
      <p>Loading content letter details...</p>
    </ng-template>
  `,
  styleUrls: ['./gb-content-letter-detail.scss']
})
export class GbContentLetterDetailComponent implements OnInit, OnDestroy {
  letter: ContentLetter | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private letterStateService: LetterStateService
  ) {}

  ngOnInit(): void {
    const letterId = this.route.snapshot.paramMap.get('id'); // Get the letter ID from the route

    if (letterId) {
      // Subscribe to the contentLetters observable to reactively get data
      const sub = this.letterStateService.contentLetters$.subscribe(
        (letters) => {
          this.letter = letters.find(l => l.id === letterId) || null; // Find the letter with the matching ID

          // If letter is not found in the current state, load content letters
          if (!this.letter) {
            this.letterStateService.loadContentLetters();
          }
        },
        (error) => {
          console.error('Error fetching content letter:', error);
          // Handle the error appropriately
        }
      );
      this.subscription.add(sub);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }
}