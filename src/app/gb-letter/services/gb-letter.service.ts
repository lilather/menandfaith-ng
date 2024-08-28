import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateLetterTemplateDto,
  UpdateLetterTemplateDto,
  CreateLetterContentDto,
  UpdateLetterContentDto,
} from '../dtos/index'; // Adjust the import path to your DTOs
import { ContentLetter, TemplateLetter } from '../models/index'; // Adjust the import path to your interfaces

@Injectable({
  providedIn: 'root',
})
export class LetterService {
  private apiUrl = 'http://localhost:3000/letters'; // Base URL for the NestJS API

  constructor(private http: HttpClient) {}

  // Create a template letter
  createTemplateLetter(createLetterTemplateDto: CreateLetterTemplateDto): Observable<TemplateLetter> {
    return this.http.post<TemplateLetter>(`${this.apiUrl}/template`, createLetterTemplateDto);
  }

  // Create a content letter
  createContentLetter(createLetterContentDto: CreateLetterContentDto): Observable<ContentLetter> {
    return this.http.post<ContentLetter>(`${this.apiUrl}/content`, createLetterContentDto);
  }

  // Get a template letter by ID
  getTemplateLetter(id: string): Observable<TemplateLetter> {
    return this.http.get<TemplateLetter>(`${this.apiUrl}/template/${id}`);
  }

  // Get a content letter by ID
  getContentLetter(id: string): Observable<ContentLetter> {
    return this.http.get<ContentLetter>(`${this.apiUrl}/content/${id}`);
  }

  // Get all template letters for the current user
  getAllTemplateLetters(): Observable<TemplateLetter[]> {
    return this.http.get<TemplateLetter[]>(`${this.apiUrl}/template`);
  }

  // Get all content letters for the current user
  getAllContentLetters(): Observable<ContentLetter[]> {
    return this.http.get<ContentLetter[]>(`${this.apiUrl}/content`);
  }

  // Update a template letter
  updateTemplateLetter(id: string, updateLetterTemplateDto: UpdateLetterTemplateDto): Observable<TemplateLetter> {
    return this.http.put<TemplateLetter>(`${this.apiUrl}/template/${id}`, updateLetterTemplateDto);
  }

  // Update a content letter
  updateContentLetter(id: string, updateLetterContentDto: UpdateLetterContentDto): Observable<ContentLetter> {
    return this.http.put<ContentLetter>(`${this.apiUrl}/content/${id}`, updateLetterContentDto);
  }

  // Delete a template letter
  deleteTemplateLetter(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/template/${id}`);
  }

  // Delete a content letter
  deleteContentLetter(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/content/${id}`);
  }
}
