import { Injectable, signal, effect } from '@angular/core';
import { Observable, of } from 'rxjs';
import {computed} from '@angular/core';
import { catchError, tap  } from 'rxjs/operators';
import { ContentLetter } from '../models';
import { contentLetterService } from './gb-letter-content.service';
import { toObservable } from '@angular/core/rxjs-interop';
import {UpdateLetterContentDto} from "../dtos";
@Injectable({
  providedIn: 'root',
})
export class contentLetterStateService {
  // Define a signal for storing all content letters
  contentLetters = signal<ContentLetter[]>([]);
  contentLetters$ = toObservable(this.contentLetters);
  contentLettersCount = computed(() => this.contentLetters().length);

  constructor(private letterService: contentLetterService) {
    this.loadContentLetters();
  }

  // Load all content letters from the API
  loadContentLetters(): void {
    this.letterService.getAllContentLetters().pipe(
      catchError((error) => {
        console.error('Error loading content letters:', error);
        return of([]); // Return an empty array on error
      }),
      tap((letters) => this.contentLetters.set(letters || [])) // Ensure letters is never null
    ).subscribe();
  }

  // Get a content letter by ID
  getContentLetterById(id: string): Observable<ContentLetter | undefined | null> {
    return this.letterService.getContentLetterById(id).pipe(
      catchError((error) => {
        console.error('Error fetching content letter:', error);
        return of(undefined); // Return undefined if not found or on error
      })
    );
  }

  // Add a new content letter via API
// Add a new content letter via API
  addContentLetter(newLetter: ContentLetter): void {
    this.letterService.createContentLetter(newLetter).pipe(
      tap((letter) => {
        if (letter) { // Check that letter is not null
          this.contentLetters.update((currentLetters) => [...currentLetters, letter]);
          console.log('New content letter added via API:', letter);
        } else {
          console.warn('Failed to add content letter: received null');
        }
      }),
      catchError((error) => {
        console.error('Error adding content letter:', error);
        return of(null); // Return null to complete the stream gracefully
      })
    ).subscribe();
  }


  // Update an existing content letter via API
  updateContentLetter(updatedLetter: ContentLetter): void {
    if (!updatedLetter.id) {
      console.error(`Error: updatedLetter.id is undefined.${JSON.stringify(updatedLetter)}`);
      return; // Exit early if id is missing
    }
    // Cons
    // truct the DTO and assert id as string
    const updateDto: UpdateLetterContentDto = {
        id:updatedLetter.id,
        subject:updatedLetter.subject,
        content:updatedLetter.content,
        signature:updatedLetter.signature,
        draft:updatedLetter.draft,
      }
    this.letterService.updateContentLetter(updateDto).pipe(
      tap((letter) => {
        if (letter) {
          console.log('updateDto', JSON.stringify(updateDto, null, 2));

          // Log the letter object before sending it to the API

          // Update contentLetters if a letter is successfully returned
          this.contentLetters.update((currentLetters) =>
            currentLetters.map((l) => (l.id === letter.id ? letter : l))
          );
          console.log('Content letter updated via API:', letter);
        } else {
          console.warn('Failed to update content letter: received null');
        }
      }),
      catchError((error) => {
        console.error('Error updating content letter:', error);
        return of(null); // Return null to complete the stream gracefully
      })
    ).subscribe();
  }
  // Delete a content letter via API
  deleteContentLetter(id: string): void {
    this.letterService.deleteContentLetter(id).pipe(
      tap(() => {
        this.contentLetters.update((currentLetters) =>
          currentLetters.filter((letter) => letter.id !== id)
        );
        console.log('Content letter deleted via API:', id);
      }),
      catchError((error) => {
        console.error('Error deleting content letter:', error);
        return of(null);
      })
    ).subscribe();
  }
}
