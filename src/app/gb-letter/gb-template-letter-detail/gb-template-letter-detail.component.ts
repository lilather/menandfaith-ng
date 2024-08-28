import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LetterStateService } from '../services/gb-letter-state-service'; // Adjust the path
import { TemplateLetter } from '../models'; // Adjust the import path

@Component({
  selector: 'app-gb-template-letter-detail',
  template: `
    <div *ngIf="letter; else loading">
      <h2>{{ letter.subject }}</h2>
    </div>
    <ng-template #loading>
      <p>Loading template letter details...</p>
    </ng-template>
  `,
  styleUrls: ['../gb-content-letter-detail/gb-content-letter-detail.scss']
})
export class GbTemplateLetterDetailComponent implements OnInit, OnDestroy {
  letter: TemplateLetter | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private letterStateService: LetterStateService
  ) {}

  ngOnInit(): void {
    const letterId = this.route.snapshot.paramMap.get('id'); // Get the letter ID from the route

    if (letterId) {
      // Subscribe to the templateLetters observable to reactively get data
      const sub = this.letterStateService.templateLetters$.subscribe(
        (letters) => {
          this.letter = letters.find(l => l.id === letterId) || null; // Find the letter with the matching ID

          // If letter is not found in the current state, load template letters
          if (!this.letter) {
            this.letterStateService.loadTemplateLetters(); // Correct method to fetch data
          }
        },
        (error) => {
          console.error('Error fetching template letter:', error);
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
