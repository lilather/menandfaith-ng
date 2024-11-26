// CreateLetterTemplateDto for creating a new template letter
export interface CreateLetterTemplateDto {
    subject: string;
    introduction?: string;
    reasonForGoodbye?: string;
    turningPoint?: string;
    stepsForChange?: string[];
    futureAspirations?: string;
    affirmation?: string;
    conclusion?: string;
    signature: string;
    draft: boolean;
  }

  // UpdateLetterTemplateDto for updating an existing template letter
  export interface UpdateLetterTemplateDto {
    id?: string;
    subject?: string;
    introduction?: string;
    reasonForGoodbye?: string;
    turningPoint?: string;
    stepsForChange?: string[];
    futureAspirations?: string;
    affirmation?: string;
    conclusion?: string;
    signature?: string;
    draft?: boolean;
  }

