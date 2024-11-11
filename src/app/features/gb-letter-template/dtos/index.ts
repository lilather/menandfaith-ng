// CreateLetterTemplateDto for creating a new template letter
export interface CreateLetterTemplateDto {
    subject: string;
    userId: string; // or may be excluded if handled server-side
    introduction?: string;
    reasonForGoodbye?: string;
    turningPoint?: string;
    stepsForChange?: string[];
    futureAspirations?: string;
    affirmation?: string;
    conclusion?: string;
    signature: string;
  }

  // UpdateLetterTemplateDto for updating an existing template letter
  export interface UpdateLetterTemplateDto {
    subject?: string;
    introduction?: string;
    reasonForGoodbye?: string;
    turningPoint?: string;
    stepsForChange?: string[];
    futureAspirations?: string;
    affirmation?: string;
    conclusion?: string;
    signature?: string;
  }

