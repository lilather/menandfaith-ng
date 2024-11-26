import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CreateLetterTemplateDto, UpdateLetterTemplateDto } from '../dtos'; // Adjust the import path to your DTOs
import { TemplateLetter } from '../models'; // Adjust the import path to your interfaces
import { environment } from '../../../enviroments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LetterService {
  private apiUrl = `${environment.API_URL}/letters`; // Base URL for the NestJS API

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Create a template letter
  createTemplateLetter(createLetterTemplateDto: CreateLetterTemplateDto): Observable<TemplateLetter | null> {
    console.log('createTemplateLetter', createLetterTemplateDto);
    if (isPlatformBrowser(this.platformId)) {
      return this.http.post<TemplateLetter>(
        `${this.apiUrl}/template`,
        createLetterTemplateDto,
        { withCredentials: true }
      );
    }
    return of(null); // Return a null Observable if not in the browser
  }

  // Get a template letter by ID
  getTemplateLetterById(id: string): Observable<TemplateLetter | null> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<TemplateLetter>(
        `${this.apiUrl}/template/${id}`,
        { withCredentials: true }
      );
    }
    return of(null); // Return a null Observable if not in the browser
  }

  // Get all template letters for the current user
  getAllTemplateLetters(): Observable<TemplateLetter[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<TemplateLetter[]>(
        `${this.apiUrl}/template`,
        { withCredentials: true }
      );
    }
    return of([]); // Return an empty array if not in the browser
  }

  // Update a template letter
  updateTemplateLetter(updateLetterTemplateDto: UpdateLetterTemplateDto): Observable<TemplateLetter | null> {
    if (isPlatformBrowser(this.platformId)) {

      updateLetterTemplateDto.draft = false;
      return this.http.put<TemplateLetter>(
        `${this.apiUrl}/template`,
        updateLetterTemplateDto,
        { withCredentials: true }
      );
    }
    return of(null); // Return a null Observable if not in the browser
  }

  // Delete a template letter
  deleteTemplateLetter(id: string): Observable<void | null> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.delete<void>(
        `${this.apiUrl}/template/${id}`,
        { withCredentials: true }
      );
    }
    return of(null); // Return a null Observable if not in the browser
  }
}
