import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TemplateLetter } from '../models';
import { catchError, tap } from 'rxjs/operators';
import { LetterService } from './gb-letter-template.service';

@Injectable({
  providedIn: 'root',
})
export class LetterStateService {
  private templateLettersSubject = new BehaviorSubject<TemplateLetter[]>([]);

  templateLetters$ = this.templateLettersSubject.asObservable();

  constructor(private letterService: LetterService) {
    this.loadTemplateLetters();
  }



  // Load all template letters from the API
  loadTemplateLetters(): void {
    this.letterService.getAllTemplateLetters().pipe(
      tap((letters) => this.templateLettersSubject.next(letters)),
      catchError((error) => {
        console.error('Error loading template letters:', error);
        return of([]); // Return an empty array in case of error
      })
    ).subscribe();
  }

  // Add a new content letter via API

addTemplateLetter(newLetter: TemplateLetter): void {
    this.letterService.createTemplateLetter(newLetter).pipe(
      tap((letter) => {
        const currentLetters = this.templateLettersSubject.getValue();
        this.templateLettersSubject.next([...currentLetters, letter]);
        console.log('New template letter added via API:', letter);
      }),
      catchError((error) => {
        console.error('Error adding template letter:', error);
        return of(null);
      })
    ).subscribe();
  }

updateTemplateLetter(updatedLetter: TemplateLetter): void {
    this.letterService.updateTemplateLetter(updatedLetter.id, updatedLetter).pipe(
      tap((letter) => {
        const currentLetters = this.templateLettersSubject.getValue();
        const index = currentLetters.findIndex(l => l.id === updatedLetter.id);
        if (index > -1) {
          currentLetters[index] = letter;
          this.templateLettersSubject.next(currentLetters);
          console.log('Template letter updated via API:', letter);
        }
      }),
      catchError((error) => {
        console.error('Error updating template letter:', error);
        return of(null);
      })
    ).subscribe();
  }


  // Delete a content letter via API

}
