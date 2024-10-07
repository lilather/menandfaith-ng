import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LetterStateService } from '../services/gb-letter-state-service';
import { ContentLetter } from '../models';
import { Subscription, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid'; // Import UUID

@Component({
  selector: 'app-content-letter-add',
  templateUrl: './gb-content-letter-add.html',
  styleUrls: ['./gb-content-letter-add.scss']
})
export class GbContentAddComponent implements OnInit, OnDestroy {
  contentLetterForm: FormGroup | null = null;
  isChanged = false;
  autoSaveSubscription: Subscription | null = null;
  destroy$ = new Subject<void>();
  currentDraftId: string | null = null; // Track the current draft ID

  constructor(
    private fb: FormBuilder,
    private letterStateService: LetterStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contentLetterForm = this.fb.group({
      subject: ['', Validators.required],
      content: ['', Validators.required],
      signature: ['', Validators.required],
      draft: [true]
    });

    this.autoSaveSubscription = interval(10000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.isChanged) {
          this.saveDraft();
        }
      });

    this.contentLetterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isChanged = true;
      });
  }

  // Method to save the current form state as a draft
  saveDraft(): void {
    if (this.contentLetterForm?.valid) {
      const draftLetter: ContentLetter = {
        id: this.currentDraftId || uuidv4(), // Use existing ID or generate a new one
        ...this.contentLetterForm.value,
        lastModifiedDate: new Date()
      };

      if (this.currentDraftId) {
        // If there's an existing ID, update the draft
        this.letterStateService.updateContentLetter(draftLetter);
        console.log('Draft updated:', draftLetter);
      } else {
        // If no ID, add a new draft
        this.letterStateService.addContentLetter(draftLetter);
        this.currentDraftId = draftLetter.id; // Track the new draft's ID
        console.log('New draft added:', draftLetter);
      }

      this.isChanged = false;
    }
  }

  // Method to handle form submission as a finalized letter
  onSubmit(): void {
    if (this.contentLetterForm?.valid) {
      const finalLetter: ContentLetter = {
        id: this.currentDraftId || uuidv4(), // Use existing ID or generate a new one
        ...this.contentLetterForm.value,
        draft: false, // Set draft flag to false on submission
        createdDate: new Date(),
        lastModifiedDate: new Date()
      };

      if (this.currentDraftId) {
        // If there's an existing ID, update the draft as a final letter
        this.letterStateService.updateContentLetter(finalLetter);
      } else {
        // If no ID, treat as new final letter
        this.letterStateService.addContentLetter(finalLetter);
      }

      this.contentLetterForm.reset({
        draft: true
      });
      this.currentDraftId = null; // Reset the current draft ID
      this.router.navigate(['goodbye-letter']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateToList(): void {
    this.router.navigate(['goodbye-letter/gb-list/content-only']);
  }
}
