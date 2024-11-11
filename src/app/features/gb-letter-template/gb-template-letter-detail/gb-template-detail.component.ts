import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {  tap, catchError, switchMap, filter} from 'rxjs/operators';
import { LetterStateService } from '../services/gb-letter-template-state-service'; // Adjust the path
import { TemplateLetter } from './../models/letter-template.model'; // Adjust the import path
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-gb-template-letter-detail',
  templateUrl: './gb-template-detail.component.html',
  styleUrls: ['./gb-template-detail.scss']
})
export class GbTemplateLetterDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  letter: TemplateLetter = {
    id: '',
    subject: '',
    userId: '',
    introduction: '',
    reasonForGoodbye: '',
    turningPoint: '',
    stepsForChange: [] , // Initialized as an empty array to prevent undefined issues
    futureAspirations: '',
    affirmation: '',
    conclusion: '',
    signature: '',
    draft: false
  };

  isChanged: boolean = false; // Property to track if changes have been made


  constructor(
    private route: ActivatedRoute,
    private letterStateService: LetterStateService
  ) {}



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
      console.log('Saving changes...', this.letter);
      this.isChanged = false; // Reset change tracking after saving
    }
    onInputChange(): void {
      this.isChanged = true; // Set to true when any input is changed
    }

    ngOnDestroy(): void {
      // Clean up the subscription when the component is destroyed
      this.subscription.unsubscribe();
    }
  }
