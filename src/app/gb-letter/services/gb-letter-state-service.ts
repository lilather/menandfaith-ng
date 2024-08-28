import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContentLetter, TemplateLetter } from '../models';
import { LetterService } from './gb-letter.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class LetterStateService {
  private templateLettersSubject = new BehaviorSubject<TemplateLetter[]>([]);
  private contentLettersSubject = new BehaviorSubject<ContentLetter[]>([]);

  templateLetters$ = this.templateLettersSubject.asObservable();
  contentLetters$ = this.contentLettersSubject.asObservable();

  constructor(private letterService: LetterService) {}

  // Public method to load content letters
  loadContentLetters() {
    this.letterService.getAllContentLetters().subscribe(
      (letters) => this.contentLettersSubject.next(letters),
      (error) => console.error('Error loading content letters:', error)
    );
  }

  // Public method to load template letters
  loadTemplateLetters() {
    this.letterService.getAllTemplateLetters().subscribe(
      (letters) => this.templateLettersSubject.next(letters),
      (error) => console.error('Error loading template letters:', error)
    );
  }

  // Public method to set content letters
  setContentLetters(letters: ContentLetter[]) {
    this.contentLettersSubject.next(letters);
  }

  setTemplateLetters(letters: TemplateLetter[]) {
    this.templateLettersSubject.next(letters);
  }
}
