// CreateLetterContentDto for creating a new content letter
export interface CreateLetterContentDto {
  subject: string;
  content: string;
  draft: boolean;
  signature: string;
}

// UpdateLetterContentDto for updating an existing content letter
export interface UpdateLetterContentDto
 {
   id?: string;
  subject?: string;
  content?: string;
  signature?: string;
  draft?: boolean;
}
