export interface TemplateLetter {
  id?: string;
  _id?: string;
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
    createdAt?: Date;
    updatedAt?: Date;
}
