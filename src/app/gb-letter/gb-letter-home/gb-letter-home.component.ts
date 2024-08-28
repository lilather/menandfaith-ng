import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { LetterService } from '../services/gb-letter.service'; // Adjust the path as necessary
import { ContentLetter, TemplateLetter } from '../models'; // Adjust the import path
import { LetterStateService } from '../services/gb-letter-state-service'; // Import the state service

@Component({
  selector: 'gb-letter-home',
  templateUrl: './gb-letter-home.component.html', // Adjust the path as necessary
  styleUrls: ['./gb-letter-home.component.scss'], // Adjust the path as necessary
})
export class GbLetterHomeComponent implements OnInit {
  templateLetters: TemplateLetter[] = [];
  contentLetters: ContentLetter[] = [];
  templateLetterCount: number = 0; // To count all template letters
  templateLetterDraftCount: number = 0; // To count draft template letters
  contentLetterCount: number = 0; // To count all content letters
  contentLetterDraftCount: number = 0; // To count draft content letters

  // Bind these objects to the form fields in the template


  constructor(private letterStateService: LetterStateService,  private letterService: LetterService, private router: Router) {} // Inject Router

  ngOnInit() {
    this.loadLetters();
  }

  loadLetters() {
    this.letterService.getAllTemplateLetters().subscribe((letters) => {
      this.templateLetters = letters;
      this.templateLetterCount = letters.length;
      this.templateLetterDraftCount = letters.filter(letter => letter.draft === true).length;
      this.letterStateService.setTemplateLetters(letters);
      // Count draft template letters
    });

    this.letterService.getAllContentLetters().subscribe((letters) => {
      this.contentLetters = letters;
      this.contentLetterCount = letters.length;
      this.contentLetterDraftCount = letters.filter(letter => letter.draft === true).length;
      this.letterStateService.setContentLetters(letters);
      // Count draft content letters
    });
  }

  // Methods to handle displaying all letters
  showLetters() {
    // Logic to show all template letters or navigate to a different component
    this.router.navigate(['/template-letters']); // Navigate to a detailed view page
  }

  showContentLetters() {
    // Logic to show all content letters or navigate to a different component
    console.log('Show all content letters');
    this.router.navigate(['/content-letters']); // Navigate to a detailed view page
  }
}

