import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription, of } from 'rxjs';
import {  tap, catchError, switchMap} from 'rxjs/operators';
import {templateLetterStateService } from '../services/gb-letter-template-state-service'; // Adjust the path
import { TemplateLetter } from './../models/letter-template.model'; // Adjust the import path
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'; // Import PrimeNG MessageService
import { ButtonModule } from 'primeng/button';
import {DialogComponent} from './../../../../shared/confirmation-modal/confirmation-modal.component'
@Component({
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule, ToastModule, ButtonModule, DialogComponent],
    providers: [MessageService], // Add MessageService as a provider
    selector: 'app-gb-template-letter-detail',
    templateUrl: './gb-template-detail.component.html',
    styleUrls: ['./gb-template-detail.scss']
})
export class GbTemplateLetterDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  letter: TemplateLetter = {
    id: '',
    subject: '',
    introduction: '',
    reasonForGoodbye: '',
    turningPoint: '',
    stepsForChange: [], // Initialized as an empty array to prevent undefined issues
    futureAspirations: '',
    affirmation: '',
    conclusion: '',
    signature: '',
    draft: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  isChanged: boolean = false; // Property to track if changes have been made


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private letterStateService: templateLetterStateService,
    private messageService: MessageService // Inject MessageService

  ) {
  }

  isDialogVisible: boolean = false; // Controls dialog visibility

  // Configuration object for the dialog
  dialogConfig = {
    header: '',
    message: '',
    dialogClass: '',
    action: () => {} // Function to execute on confirmation
  };

  // Show the dialog dynamically
  showDialog(config: Partial<typeof this.dialogConfig>) {
    this.dialogConfig = { ...this.dialogConfig, ...config };
    this.isDialogVisible = true;
  }

  // Handle dialog confirmation
  onDialogConfirm() {
    console.log(this.dialogConfig.action)
    if (this.dialogConfig.action) {
      this.dialogConfig.action(); // Execute the assigned action
    }
    this.isDialogVisible = false; // Close the dialog
  }

  ngOnInit(): void {
    const letterId = this.route.snapshot.paramMap.get('id'); // Get the letter ID from the route

    if (letterId) {
      // Combine checking the current state and loading if needed into a single stream
      const sub = this.letterStateService.templateLetters$.pipe(
        tap((letters) => {
          this.letter = letters.find(l => l.id === letterId) || this.letter;
        }),
        switchMap((letters) => {
          // If letter is not found, load template letters
          if (!this.letter) {
            return this.letterStateService.templateLetters$.pipe(
              tap((loadedLetters) => {
                this.letter = loadedLetters.find(l => l.id === letterId) || this.letter;
              }),
              catchError((error) => {
                console.error('Error loading template letters:', error);
                return []; // Return an empty array to continue the observable chain
              })
            );
          }
          return []; // Return an empty array if no need to load
        }),
        catchError((error) => {
          console.error('Error fetching template letter:', error);
          return []; // Return an empty array to handle errors gracefully
        })
      ).subscribe();

      this.subscription.add(sub);
    }
  }

  saveChanges(): void {
    // Logic to save changes, such as calling a service method to update the letter
    this.letterStateService.updateTemplateLetter(this.letter);
    this.isChanged = false; // Reset change tracking after saving
    // Display success toast notification
    this.messageService.add({
      severity: 'success',
      summary: 'Saved',
      detail: 'Your Letter has been saved successfully!' ,
      life: 4000
    });
  }

  onInputChange(): void {
    this.isChanged = true; // Set to true when any input is changed
  }




  confirmDeleteLetter(): void {
    if (this.letter.id) {
      const id = this.letter.id;
      this.letterStateService.deleteTemplateLetter(id).pipe(
        tap(() => {
          this.router.navigate(['']);

          // Update state logic if needed
        }),
        catchError((error) => {
          console.error('Error deleting template letter:', error);
          return of(null);
        })
      ).subscribe();
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); // Unsubscribe from the observable
  }


  // Add a new step
  addStep(): void {
    this.letter.stepsForChange?.push('');
  }

  // Remove a step at a specific index
  removeStep(index: number): void {
    if (this.letter && this.letter.stepsForChange) {
      this.letter.stepsForChange.splice(index, 1); // Remove the step at the specified index
    }
    this.onInputChange();
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
