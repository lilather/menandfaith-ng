export interface ContentLetter {
    id?: string;
    _id?: string;
    content: string;
    subject: string;
    draft: boolean;
    signature: string;
    createdDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }
