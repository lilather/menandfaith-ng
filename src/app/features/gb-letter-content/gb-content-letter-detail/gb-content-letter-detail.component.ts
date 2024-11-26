import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { LetterStateService } from '../services/gb-letter-content.state-service';
import { ContentLetter } from '../models';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [FormsModule, DatePipe, ReactiveFormsModule, CommonModule],
    selector: 'app-gb-content-letter-detail',
    templateUrl: './gb-template-letter-home.component.html',
    styleUrls: ['./gb-template-letter-home.component.scss']
})
export class GbContentLetterDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isChanged = false;

  letter: ContentLetter = {
    id: '', // Initialize with an empty string to avoid potential `undefined` issues
    subject: '',
    content: '',
    createdDate: new Date(),
    lastModifiedDate: new Date(),
    signature: '',
    draft: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private letterStateService: LetterStateService
  ) {}

  ngOnInit(): void {
    // Extract the letter ID from the route parameters with a default empty string fallback
    const letterId = this.route.snapshot.paramMap.get('id') || '';

    if (letterId) {
      const sub = this.letterStateService.getContentLetterById(letterId).pipe(
        tap((letter) => {
          if (letter) {
            this.letter = letter;
          }
        }),
        switchMap((letter) => {
          if (!letter) {
            return this.letterStateService.contentLetters$.pipe(
              tap((loadedLetters) => {
                this.letter = loadedLetters.find(l => l.id === letterId) || this.letter;
              })
            );
          }
          return of(letter);
        }),
        catchError((error) => {
          console.error('Error fetching or loading content letters:', error);
          return of(null);
        })
      ).subscribe();

      this.subscription.add(sub);
    }
  }

  onInputChange(): void {
    this.isChanged = true;
    this.letter.lastModifiedDate = new Date();
  }

  saveChanges(): void {
    console.log('Saving changes:', this.letter);
    this.letterStateService.updateContentLetter(this.letter);
    this.isChanged = false;
  }

  backToList(): void {
    this.router.navigate(['goodbye-letter-content']);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  showConfirmation: boolean = false;

  deleteLetter(): void {
    this.showConfirmation = true;
  }

  confirmDelete(): void {
    this.showConfirmation = false;

    console.log('Deleting letter:', this.letter);
    // Ensure `letter.id` is defined before attempting to delete
    if (this.letter.id) {
      this.letterStateService.deleteContentLetter(this.letter.id);
      this.router.navigate(['/goodbye-letter-content']);
    }
  }

  cancelDelete(): void {
    this.showConfirmation = false;
  }

}
