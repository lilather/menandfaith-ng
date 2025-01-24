import {Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TemplateLetter } from '../models';
import { catchError, tap } from 'rxjs/operators';
import { templateLetterService } from './gb-letter-template.service';
import { UpdateLetterTemplateDto } from '../dtos';
import {ContentLetter} from "../../gb-letter-content/models";
import {toObservable} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root',
})
export class templateLetterStateService {
  templateLetters = signal<TemplateLetter[]>([]);
  templateLetters$ = toObservable(this.templateLetters);
  // A computed signal that automatically returns the array length
  templateLettersCount = computed(() => this.templateLetters().length);

  // If you also want an observable version for async pipes
  templateLettersCount$ = toObservable(this.templateLettersCount);
  constructor(private letterService:templateLetterService) {
    this.loadTemplateLetters();
  }



  // Load all template letters from the API
  loadTemplateLetters(): void {
    this.letterService.getAllTemplateLetters().pipe(
      catchError((error) => {
        console.error('Error loading content letters:', error);
        return of([]); // Return an empty array on error
      }),
      tap((letters) => this.templateLetters.set(letters || [])) // Ensure letters is never null
    ).subscribe();
  }

  getTemplateLetterById(id: string): Observable<TemplateLetter | undefined | null> {
    return this.letterService.getTemplateLetterById(id).pipe(
      catchError((error) => {
        console.error('Error fetching content letter:', error);
        return of(undefined); // Return undefined if not found or on error
      })
    );
  }
  // Add a new content letter via API
  addTemplateLetter(newLetter: TemplateLetter): void {
    this.letterService.createTemplateLetter(newLetter).pipe(
      tap((letter) => {
        if (letter) { // Check that letter is not null
          this.templateLetters.update((templateLetters) => [...templateLetters, letter]);
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

  updateTemplateLetter(updatedTemplate: TemplateLetter): void {
    if (!updatedTemplate.id) {
      console.error(`Error: updatedTemplate.id is undefined. ${JSON.stringify(updatedTemplate)}`);
      return;
    }

    const updateDto: UpdateLetterTemplateDto = {
      id: updatedTemplate.id,
      subject: updatedTemplate.subject,
      introduction: updatedTemplate.introduction,
      reasonForGoodbye: updatedTemplate.reasonForGoodbye,
      turningPoint: updatedTemplate.turningPoint,
      stepsForChange: updatedTemplate.stepsForChange,
      futureAspirations: updatedTemplate.futureAspirations,
      affirmation: updatedTemplate.affirmation,
      conclusion: updatedTemplate.conclusion,
      signature: updatedTemplate.signature,
    };

    this.letterService.updateTemplateLetter(updateDto).pipe(
      tap((letter) => {
        if (letter) {
          this.templateLetters.update((currentTemplates: TemplateLetter[]) =>
            currentTemplates.map((t: TemplateLetter) => (t.id === letter.id ? letter : t))
          );
        } else {
          console.warn('Failed to update template letter: received null');
        }
      }),
      catchError((error) => {
        console.error('Error updating template letter:', error);
        return of(null);
      })
    ).subscribe();
  }
  deleteTemplateLetter(id: string): Observable<void | null> {
    return this.letterService.deleteTemplateLetter(id).pipe(
      tap(() => {
        this.templateLetters.update((currentLetters) =>
          currentLetters.filter((letter) => letter.id !== id)
        );
        console.log('Content letter deleted via API:', id);
      }),
      catchError((error) => {
        console.error('Error deleting content letter:', error);
        return of(); // Return an empty Observable to maintain the return type
      })
    );
  }
  // Delete a content letter via API

}
