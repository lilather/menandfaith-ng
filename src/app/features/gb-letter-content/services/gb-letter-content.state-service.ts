import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContentLetter } from '../models';
import { catchError, tap } from 'rxjs/operators';
import { LetterService } from './gb-letter-content.service';

@Injectable({
  providedIn: 'root',
})
export class LetterStateService {
  private contentLettersSubject = new BehaviorSubject<ContentLetter[]>([]);

  contentLetters$ = this.contentLettersSubject.asObservable();

  constructor(private letterService: LetterService) {
    this.loadContentLetters();
  }

  // Load all content letters from the API
  loadContentLetters(): void {
    this.letterService.getAllContentLetters().pipe(
      tap((letters) => this.contentLettersSubject.next(letters)),
      catchError((error) => {
        console.error('Error loading content letters:', error);
        return of([]); // Return an empty array in case of error
      })
    ).subscribe();
  }

  // Load all template letters from the API

  getContentLetterById(id: string): Observable<ContentLetter | undefined> {
    return this.letterService.getContentLetterById(id).pipe(
      catchError((error) => {
        console.error('Error fetching content letter:', error);
        return of(undefined); // Return undefined if not found or on error
      })
    );
  }
  // Add a new content letter via API
  addContentLetter(newLetter: ContentLetter): void {
    this.letterService.createContentLetter(newLetter).pipe(
      tap((letter) => {
        const currentLetters = this.contentLettersSubject.getValue();
        this.contentLettersSubject.next([...currentLetters, letter]);
        console.log('New content letter added via API:', letter);
      }),
      catchError((error) => {
        console.error('Error adding content letter:', error);
        return of(null);
      })
    ).subscribe();
  }


  // Update an existing content letter via API
  updateContentLetter(updatedLetter: ContentLetter): void {
    this.letterService.updateContentLetter(updatedLetter.id, updatedLetter).pipe(
      tap(() => {
        const currentLetters = this.contentLettersSubject.getValue();
        const index = currentLetters.findIndex(letter => letter.id === updatedLetter.id);
        if (index !== -1) {
          currentLetters[index] = updatedLetter;
          this.contentLettersSubject.next([...currentLetters]);
        }
        console.log('Content letter updated via API:', updatedLetter);
      }),
      catchError((error) => {
        console.error('Error updating content letter:', error);
        return of(null);
      })
    ).subscribe();
  }

  // Delete a content letter via API
  deleteContentLetter(id: string): void {
    this.letterService.deleteContentLetter(id).pipe(
      tap(() => {
        const updatedLetters = this.contentLettersSubject.getValue().filter(letter => letter.id !== id);
        this.contentLettersSubject.next(updatedLetters);
        console.log('Content letter deleted via API:', id);
      }),
      catchError((error) => {
        console.error('Error deleting content letter:', error);
        return of(null);
      })
    ).subscribe();
  }
}
