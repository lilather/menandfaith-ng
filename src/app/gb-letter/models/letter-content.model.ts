export interface ContentLetter {
    id: string;
    content: string;
    subject: string;
    userId: string;
    draft: boolean;
    signature: string;
    createdDate?: Date;
    lastModifiedDate?: Date;

  }