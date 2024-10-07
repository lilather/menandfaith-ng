import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { LetterStateService } from '../services/gb-letter-state-service'; // Service to handle letter state
import { v4 as uuidv4 } from 'uuid'; // Import UUID
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-gb-template-letter-add',
  templateUrl: './gb-template-letter-add.html',
  styleUrls: ['./gb-template-letter-add.scss'],
})
export class GbTemplateAddComponent implements OnInit, OnDestroy {
  templateForm: FormGroup;
  currentStep = 0; // Tracks the current step
  private changes$ = new Subject<void>(); // Subject to track changes
  private destroy$ = new Subject<void>(); // Subject to handle component destruction
  autoSaveSubscription: Subscription | null = null; // Subscription for autosave
  isDraft = true; // Flag to indicate if the form is a draft
  draftId: string | null = null; // Track the current draft ID

  constructor(private fb: FormBuilder, private letterStateService: LetterStateService, private router: Router) {
    // Initialize the form with multiple steps
    this.templateForm = this.fb.group({
      step1: this.fb.group({
        subject: ['', Validators.required],
      }),
      step2: this.fb.group({
        reasonForGoodbye: ['', Validators.required]
      }),
      step3: this.fb.group({
        turningPoint: ['', Validators.required]
      }),
      step4: this.fb.group({
        stepsForChange: ['', Validators.required],
      }),
      step5: this.fb.group({
        futureAspirations: ['', Validators.required]
      }),
      step6: this.fb.group({
        affirmation: ['', Validators.required]
      }),
      step7: this.fb.group({
        conclusion: ['', Validators.required]
      }),
      step8: this.fb.group({
        signature: ['', Validators.required]
      }),
      draft: [true] // Include a draft flag
    });
  }

  ngOnInit(): void {
    // Set up autosave with debounce
    this.autoSaveSubscription = this.changes$.pipe(
      debounceTime(5000), // Wait for 5 seconds of inactivity
      takeUntil(this.destroy$) // Unsubscribe when the component is destroyed
    ).subscribe(() => {
      this.autoSave();
    });

    // Listen for form changes and trigger autosave
    this.templateForm.valueChanges
      .pipe(takeUntil(this.destroy$)) // Unsubscribe on destroy
      .subscribe(() => {
        this.changes$.next(); // Emit change event
      });
  }

  // Method to handle autosave logic
  autoSave(): void {
    const currentFormValues = this.flattenFormData(this.templateForm.value);
    const isValidDraft = currentFormValues.draft || this.templateForm.valid; // Check if it's valid as a draft or final

    if (isValidDraft) {
      if (!this.draftId) {
        // First time saving as a draft, generate a new ID
        this.draftId = uuidv4();
        currentFormValues.id = this.draftId;
        this.letterStateService.addTemplateLetter(currentFormValues); // Save as a new draft
        console.log('New draft saved:', currentFormValues);
      } else {
        // Update existing draft
        currentFormValues.id = this.draftId;
        this.letterStateService.updateTemplateLetter(currentFormValues); // Update the draft
      }
    } else {
      console.log('Form not valid for autosave');
    }
  }

  formFieldDescriptions = {
    step1: {
      subject: {
        description: "The main focus of the letter, identifying the specific vice or habit being addressed.",
        example: "Goodbye to Alcohol"
      }
    },
    // Continue with other steps...
  };

  // Move to the next step
  nextStep() {
    const totalSteps = Object.keys(this.templateForm).length; // Total number of steps
    if (this.currentStep < totalSteps - 1 && this.isCurrentStepValid()) {
      this.currentStep++;
    }
  }

  // Move to the previous step
  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  skipStep() {
    const totalSteps = Object.keys(this.templateForm.controls).length; // Total number of steps
    if (this.currentStep < totalSteps - 1) {
      this.currentStep++;
    }
  }

  saveDraftAndGoToList() {
    this.autoSave(); // Save current data as draft
    this.router.navigate(['/gb-list', 'Both']); // Navigate to the list view (adjust the route as necessary)
  }


  // Check if the current step is valid
  isCurrentStepValid(): boolean {
    const step = this.getCurrentStepGroup();
    return step.valid;
  }

  // Get the FormGroup for the current step
  getCurrentStepGroup(): FormGroup {
    const stepNames = [
      'step1', 'step2', 'step3',
      'step4', 'step5', 'step6',
      'step7', 'step8'
    ];
    return this.templateForm.get(stepNames[this.currentStep]) as FormGroup;
  }
  
  flattenFormData(formData: any): any {
    const flat= {
      subject: formData.step1.subject,
      introduction: '', // If you have an introduction, populate it here
      reasonForGoodbye: formData.step2.reasonForGoodbye,
      turningPoint: formData.step3.turningPoint,
      stepsForChange: formData.step4.stepsForChange,
      futureAspirations: formData.step5.futureAspirations,
      affirmation: formData.step6.affirmation,
      conclusion: formData.step7.conclusion,
      signature: formData.step8.signature,
      draft: formData.draft,
      userId: '123', // Replace with actual user ID or data as needed
      id: formData.id
    };
    return flat;
  }
  // Submit the form data and finalize it
  onSubmit() {
    if (this.templateForm.valid) {
      const finalFormValues = this.flattenFormData({ ...this.templateForm.value, draft: false });
      console.log('Flattened data:', finalFormValues);
      // Set draft to false on final submission
      if (this.draftId) {
        finalFormValues.id = this.draftId;
        this.letterStateService.updateTemplateLetter(finalFormValues); // Update the existing letter as finalized
      } else {
        finalFormValues.id = uuidv4(); // New final letter, generate ID
        this.letterStateService.addTemplateLetter(finalFormValues); // Add as a new letter
      }
      this.isDraft = false; // Change the draft status
      // Handle form submission logic, such as sending data to a server
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); // Ensure proper cleanup
    if (this.autoSaveSubscription) {
      this.autoSaveSubscription.unsubscribe(); // Unsubscribe to autosave
    }
  }
}
