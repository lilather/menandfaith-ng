import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { contentLetterStateService } from './../services/gb-letter-content.state-service';
import { ContentLetter } from './../models/letter-content.model';
import { Subscription, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { contentLetterService } from '../services/gb-letter-content.service';
import { UserStateService } from '../../../../users/services/user-state-service';
// Import PrimeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule,InputTextModule,        // PrimeNG input text module
      InputTextareaModule,    // PrimeNG input textarea module
      ButtonModule,           // PrimeNG button module
      CheckboxModule,
      CardModule,
    ] ,     // PrimeNG checkbox module],
    selector: 'app-content-letter-add',
    templateUrl: './gb-content-letter-add.html',
    styleUrls: ['./gb-content-letter-add.scss']
})
export class GbContentAddComponent implements OnInit, OnDestroy {
  contentLetterForm: FormGroup = this.fb.group({});
  isChanged = false;
  autoSaveSubscription: Subscription | null = null;
  destroy$ = new Subject<void>();
  currentDraftId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private letterStateService: contentLetterStateService,
    private router: Router,
    private letterService: contentLetterService,
    private userStateService: UserStateService,
    // Inject UserStateService
  ) {
  }


  ngOnInit(): void {
    // Initialize form with validators
    this.contentLetterForm = this.fb.group({
      subject: ['', Validators.required],
      content: ['', Validators.required],
      signature: ['', Validators.required],
      draft: [true]
    });

    // Set up interval-based auto-save every 10 seconds, checking `isChanged`


    // Listen for form value changes and set `isChanged` flag
    this.contentLetterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isChanged = true;
      });
  }

  // Method to save the current form state as a draft



  // Handle form submission as a finalized letter
  onSubmit(): void {
    if (this.contentLetterForm.valid) {
      const finalLetter: ContentLetter = {
        id: this.currentDraftId || null, // Mongoose will generate the _id
        ...this.contentLetterForm.value,
      };
      if (this.currentDraftId) {
        // Update the existing draft as a final letter
        this.letterStateService.updateContentLetter(finalLetter);
      } else {
        // Add as a new final letter
        this.letterStateService.addContentLetter(finalLetter);
      }

      // Reset the form and draft ID after submission
      this.contentLetterForm.reset({
        draft: true
      });
      this.currentDraftId = null;
      this.isChanged = false;

      // Navigate to a specified route (e.g., homepage or letter list)
    }
  }

  // Clean up subscriptions on component destroy

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.autoSaveSubscription) {
      this.autoSaveSubscription.unsubscribe();
    }
  }


  navigateToList(): void {
    // Navigate to the goodbye letter list
  }
}
