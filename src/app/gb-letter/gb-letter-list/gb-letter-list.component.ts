import { Component, OnInit } from '@angular/core';
import { LetterStateService } from '../services/gb-letter-state-service'; // Adjust the path as necessary
import { ContentLetter, TemplateLetter } from '../models';

@Component({
  selector: 'app-content-letter-list',
  templateUrl: './gb-letter-list.html',
  styleUrls: ['./gb-letter-list.scss']
})
export class GbLetterListComponent implements OnInit {
  contentLetters: ContentLetter[] = [];
  templateLetters: TemplateLetter[] = [];

  constructor(private letterStateService: LetterStateService) {}

  ngOnInit(): void {
    // Subscribe to the content letters observable
    this.letterStateService.contentLetters$.subscribe((letters) => {
      this.contentLetters = letters;
    });

    // Subscribe to the template letters observable
    this.letterStateService.templateLetters$.subscribe((letters) => {
      this.templateLetters = letters;
    });
  }
}
