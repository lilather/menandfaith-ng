
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LetterStateService } from '../services/gb-letter-state-service'; // Adjust the path as necessary
import { LetterService } from '../services/gb-letter.service'; // Import the state service
import { ContentLetter } from '../models'; // Adjust the import path


@Component({
    selector: 'app-content-letter-add',
    templateUrl: './gb-content-letter-add.html',
    styleUrls: ['./gb-content-letter-add.scss']
  })
  export class GbLetterAddContentComponent implements OnInit {
    contentLetterForm: FormGroup | undefined;
    contentLetters: ContentLetter[] = [];
    letter = {
      subject: '',
      content: ''
    };
  
    constructor(
      private fb: FormBuilder,
      private letterStateService: LetterStateService,
      private letterService: LetterService
    ) {}
  
    ngOnInit() {
      this.contentLetterForm = this.fb.group({
        // Define your form fields here
        // Example:
        subject: ['', Validators.required],
        content: ['', Validators.required],
        // ... other fields
      });
  
      // Subscribe to the content letters observable from the state service
      this.letterStateService.contentLetters$.subscribe((letters) => {
        this.contentLetters = letters;
      });
    }
  
    onSubmit(letterForm: NgForm) {
      // Check if the form is valid
      if (letterForm.valid) {
        const newContentLetter = letterForm.value;
        // Add the new letter to the state service and update the UI
        this.letterService.createContentLetter(newContentLetter).subscribe(() => {
          // Update the content letters in the state service
          this.letterStateService.setContentLetters([...this.contentLetters, newContentLetter]);
          // Reset the form after submission
          letterForm.resetForm();
        });
      }
    }
  }