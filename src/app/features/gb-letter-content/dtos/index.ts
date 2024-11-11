// CreateLetterContentDto for creating a new content letter
export interface CreateLetterContentDto {
  subject: string;
  content: string;
  signature: string;
}

// UpdateLetterContentDto for updating an existing content letter
export interface UpdateLetterContentDto {
  subject?: string;
  content?: string;
  signature?: string;
}
