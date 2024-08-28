import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gb-template-letter-add',
  templateUrl: './gb-template-letter-add.html',
  styleUrls: ['./gb-template-letter-add.scss'],
})
export class GbTemplateLetterAddComponent {
  templateForm: FormGroup;
  currentStep = 0; // Tracks the current step

  constructor(private fb: FormBuilder) {
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
      })
    });
  }

  formFieldDescriptions = {
    step1: {
      subject: {
        description: "The main focus of the letter, identifying the specific vice or habit being addressed.",
        example: "Goodbye to Alcohol"
      }
    },
    step2: {
      reasonForGoodbye: {
        description: "Explain why you want to let go of this vice. Discuss the negative effects it has had on your life.",
        example: "Alcohol has been a way for me to escape, but it's cost me my health and my relationships. I'm ready to regain control and live a healthier life."
      }
    },
    step3: {
      turningPoint: {
        description: "Describe the moment or realization that made you decide to change. This can be a specific event or a gradual realization.",
        example: "The turning point for me was missing my son's birthday because I was too hungover. I realized I was losing precious moments with my family."
      }
    },
    step4: {
      stepsForChange: {
        description: "List the actions you plan to take to overcome the vice. These are concrete steps to help you move forward.",
        example: "Join a support group, Avoid bars and parties, Exercise daily, Seek counseling"
      }
    },
    step5: {
      futureAspirations: {
        description: "Describe what you hope to achieve by letting go of this vice. Focus on your goals and dreams for a better future.",
        example: "I want to be a present and loving parent, lead a healthier lifestyle, and be someone my family can rely on."
      }
    },
    step6: {
      affirmation: {
        description: "Write a positive statement that reinforces your commitment to change. This should motivate and inspire you.",
        example: "I am stronger than my habits, and I am capable of making lasting changes."
      }
    },
    step7: {
      conclusion: {
        description: "A closing statement that wraps up the letter. Reaffirm your commitment and express hope for the future.",
        example: "This is the beginning of a new chapter. I am committed to my healing and growth, and I believe in my ability to overcome."
      }
    },
    step8: {
      signature: {
        description: "Your name or chosen signature to make the letter personal and official.",
        example: "John Doe"
      }
    }
  };

  // Move to the next step
  nextStep() {
    const totalSteps = Object.keys(this.formFieldDescriptions).length; // Total number of steps
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

  // Submit the form data
  onSubmit() {
    if (this.templateForm.valid) {
      console.log('Form Submitted', this.templateForm.value);
      // Handle form submission logic, such as sending data to a server
    }
  }
}
