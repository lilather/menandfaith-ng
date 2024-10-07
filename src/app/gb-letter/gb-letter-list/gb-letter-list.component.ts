import { Component, OnInit } from '@angular/core';
import { LetterStateService } from '../services/gb-letter-state-service'; // Adjust the path as necessary
//import { LetterService } from '../services/gb-letter.service'; // Adjust the path as necessary
import { ContentLetter, TemplateLetter } from '../models';
import { ActivatedRoute } from '@angular/router';
import { DisplayMode } from './enums/display-mode-enum'; // Import the enum

@Component({
  selector: 'app-content-letter-list',
  templateUrl: './gb-letter-list.html',
  styleUrls: ['./gb-letter-list.scss']
})
export class GbLetterListComponent implements OnInit {
  contentLetters: ContentLetter[] = [];
  templateLetters: TemplateLetter[] = [];
  currentDisplayMode: DisplayMode | undefined; // Enum to track which letters to show

  constructor(
    private route: ActivatedRoute,
    private letterStateService: LetterStateService,
  ) {
  }

  ngOnInit(): void {
    // Subscribe to route params or set default display mode
    this.route.paramMap.subscribe(params => {
      const mode = params.get('mode');
      this.currentDisplayMode = this.getDisplayMode(mode);
    });

    this.subscribeToLetterState();
  }

  loadLetters(): void {
   /* this.letterService.getAllTemplateLetters().subscribe((letters) => {
      this.letterStateService.setTemplateLetters(letters);
    });

    this.letterService.getAllContentLetters().subscribe((letters) => {
      this.letterStateService.setContentLetters(letters);
    });
    */
  }

  subscribeToLetterState(): void {
    // Subscribe to the content letters observable
    this.letterStateService.contentLetters$.subscribe((letters) => {
      this.contentLetters = letters;
    });

    // Subscribe to the template letters observable
    this.letterStateService.templateLetters$.subscribe((letters) => {
      this.templateLetters = letters;
    });
  }
  getDisplayMode(mode: string | null): DisplayMode {
    switch (mode) {
      case 'template-only':
        return DisplayMode.TemplateOnly;
      case 'content-only':
        return DisplayMode.ContentOnly;
      case 'Both':
        return DisplayMode.Both;
      default:
        return DisplayMode.Both; // Default to showing both if none provided
    }
}
}