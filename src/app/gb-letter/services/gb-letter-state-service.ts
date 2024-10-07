import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ContentLetter, TemplateLetter } from '../models';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { sign } from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class LetterStateService {
  private templateLettersSubject = new BehaviorSubject<TemplateLetter[]>([]);
  private contentLettersSubject = new BehaviorSubject<ContentLetter[]>([]);

  templateLetters$ = this.templateLettersSubject.asObservable();
  contentLetters$ = this.contentLettersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadLettersFromJson();
  }

  private loadLettersFromJson() {
    // Directly use the provided JSON data instead of making an HTTP request
    const mockData = {
      contentLetters: [
        {
          id: '1',
          userId:'user123',
          subject: 'Farewell to Alcohol',
          content: 'Today, I say goodbye to the bottle that has taken so much from me. I choose to live a healthier life...',
          draft: false,
          signature: 'John Doe'
        },
        {
          id: '2',
          userId:'user456',
          subject: 'Breaking Free from Procrastination',
          content: 'No more delays. I am taking charge of my life and pursuing my goals without hesitation. Today marks a new beginning...',
          draft: true,
          signature: 'Jane Smith'
        }
      ],
      templateLetters: [
        {
          id: '1',
          subject: 'Farewell to Bad Habits',
          userId: 'user123',
          introduction: 'Dear Bad Habits,',
          reasonForGoodbye: 'I have realized that holding on to you has been detrimental to my health and well-being.',
          turningPoint: 'The moment I decided to prioritize my health over temporary pleasures was a turning point.',
          stepsForChange: ['Avoid triggers', 'Engage in healthier activities', 'Seek support from friends and family'],
          futureAspirations: 'I aspire to live a life free of these habits, focusing on my health and happiness.',
          affirmation: 'I am strong enough to overcome these habits.',
          conclusion: 'This is the end of our journey together.',
          signature: 'Sincerely, John',
          draft: false
        },
        {
          id: '2',
          subject: 'Breaking Free from Negativity',
          userId: 'user456',
          introduction: 'Dear Negative Thoughts,',
          reasonForGoodbye: 'You have held me back for too long, making me doubt myself at every step.',
          turningPoint: 'Realizing my potential and the opportunities I was missing out on was a wake-up call.',
          stepsForChange: ['Practice positive affirmations', 'Surround myself with supportive people', 'Focus on my achievements'],
          futureAspirations: 'I want to embrace a positive mindset and build a future full of possibilities.',
          affirmation: 'I am worthy of success and happiness.',
          conclusion: 'It’s time to let you go and make room for positivity.',
          signature: 'Best regards, Jane',
          draft: true
        },
        {
          id: '3',
          subject: 'Goodbye to Procrastination',
          userId: 'user789',
          introduction: 'Dear Procrastination,',
          reasonForGoodbye: 'You have caused me to miss out on important opportunities and have increased my stress levels.',
          turningPoint: 'Understanding the impact of procrastination on my career made me realize the need for change.',
          stepsForChange: ['Set clear goals', 'Break tasks into smaller steps', 'Use time management techniques'],
          futureAspirations: 'I aim to be productive, meet deadlines, and reduce stress.',
          affirmation: 'I have the discipline to take action and stay focused.',
          conclusion: 'This is the last time I allow you to control my actions.',
          signature: 'Sincerely, Alex',
          draft: false
        }
      ]
    };
  
    // Setting letters directly using mockData
    this.setContentLetters(mockData.contentLetters);
    this.setTemplateLetters(mockData.templateLetters);
  }
  

  /*private loadLettersFromJson() {
    const url = '../assets/letters.json'; // Correct relative path to the assets folder
    console.log('Loading letters from JSON:', url);
    this.http.get<any>(url).pipe(
      tap((data) => {
        if (data.contentLetters) {
          this.setContentLetters(data.contentLetters);
        }
        if (data.templateLetters) {
          this.setTemplateLetters(data.templateLetters);
        }
      }),
      catchError((error) => {
        console.error('Error loading letters from JSON:', error);
        return of(null); // Return null in case of error
      })
    ).subscribe();
  }
*/
  // Public method to set content letters
  setContentLetters(letters: ContentLetter[]) {
    this.contentLettersSubject.next(letters);
  }

  // Public method to set template letters
  setTemplateLetters(letters: TemplateLetter[]) {
    this.templateLettersSubject.next(letters);
  }

    // New method to load a single content letter by ID
     // New method to get a single content letter by ID from the loaded letters
  getContentLetterById(id: string): Observable<ContentLetter | undefined> {
    return this.contentLetters$.pipe(
      map(letters => letters.find(letter => letter.id === id))
    );
  }

  // New method to get a single template letter by ID from the loaded letters
  getTemplateLetterById(id: string): Observable<TemplateLetter | undefined> {
    return this.templateLetters$.pipe(
      map(letters => letters.find(letter => letter.id === id))
    );
}


addContentLetter(newLetter: ContentLetter): void {
  const currentLetters = this.contentLettersSubject.getValue(); // Get current letters
  currentLetters.push(newLetter); // Add new letter to the array
  this.setContentLetters([...currentLetters]); // Emit the updated list
  console.log('New content letter added:', newLetter);
}


  // Method to add a new template letter
  addTemplateLetter(newLetter: TemplateLetter): void {
    const currentLetters = this.templateLettersSubject.getValue(); // Get current letters
    currentLetters.push(newLetter); // Add new letter to the array
    this.setTemplateLetters([...currentLetters]); // Emit the updated list
    console.log('New template letter added:', newLetter);
  }
  // Update a specific content letter by ID
  updateContentLetter(updatedLetter: ContentLetter): void {
    const currentLetters = this.contentLettersSubject.getValue();
    const index = currentLetters.findIndex(letter => letter.id === updatedLetter.id);

    if (index !== -1) {
      // Update the existing letter
      currentLetters[index] = updatedLetter;
    } else {
      // Add the new letter (this handles both new letters and new drafts)
      currentLetters.push(updatedLetter);
    }

    this.setContentLetters([...currentLetters]); // Emit the updated list
    console.log('Content letter updated:', updatedLetter);
    console.log('Current content letters:', currentLetters);
  }

updateTemplateLetter(updatedLetter: TemplateLetter): void {
  const currentLetters = this.templateLettersSubject.getValue();
  const index = currentLetters.findIndex(letter => letter.id === updatedLetter.id);

  if (index !== -1) {
    // Replace the old letter with the updated letter
    currentLetters[index] = updatedLetter;
    this.setTemplateLetters([...currentLetters]); // Emit the updated list
    console.log('Template letter updated:', currentLetters);
  }
}

deleteContentLetter(id: string): void {
  const currentLetters = this.contentLettersSubject.getValue();
  const updatedLetters = currentLetters.filter(letter => letter.id !== id);
  this.setContentLetters(updatedLetters); // Update the state with the remaining letters
}
}