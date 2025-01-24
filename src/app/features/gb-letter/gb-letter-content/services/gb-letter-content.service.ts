import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CreateLetterContentDto, UpdateLetterContentDto } from '../dtos'; // Adjust the import path to your DTOs
import { ContentLetter } from '../models'; // Adjust the import path to your interfaces
import { environment } from '../../../../enviroments/environment';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class contentLetterService {
  private apiUrl = `${environment.API_URL}/letters`; // Base URL for the NestJS API

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Create a content letter
  createContentLetter(createLetterContentDto: CreateLetterContentDto): Observable<ContentLetter | null> {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Creating content letter:', createLetterContentDto);
      console.log(`API URL: ${this.apiUrl}/content`);
      return this.http.post<ContentLetter>(
        `${this.apiUrl}/content`,
        createLetterContentDto,
        { withCredentials: true }
      );
    }
    return of(null); // Return a null Observable if not in the browser
  }

  // Get a content letter by ID
  getContentLetterById(id: string): Observable<ContentLetter | null> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<ContentLetter>(
        `${this.apiUrl}/content/${id}`,
        { withCredentials: true }
      );
    }
    return of(null); // Return a null Observable if not in the browser
  }


  // Get all content letters
  getAllContentLetters(): Observable<ContentLetter[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<ContentLetter[] | null | undefined>(
        `${this.apiUrl}/content`,
        { withCredentials: true }
      ).pipe(
        map((letters) => letters || []) // Ensure letters is always an array, never null
      );
    }
    return of([]); // Return an empty array if not in the browser
  }

  updateContentLetter(updateLetterContentDto: UpdateLetterContentDto): Observable<ContentLetter | null> {
    return this.http.put<ContentLetter>(
      `${this.apiUrl}/content`,
      updateLetterContentDto,
      { withCredentials: true }
    ).pipe(
      catchError((error) => {
        console.log('Error making HTTP PUT request:', updateLetterContentDto);
        console.error('Error making HTTP PUT request:', error);
        return of(null); // Handle error and return a null observable
      })
    );
  }
  // Delete a content letter
  deleteContentLetter(id: string): Observable<void | null> {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Deleting content letter:', id);
      return this.http.delete<void>(
        `${this.apiUrl}/content/${id}`,
        { withCredentials: true }
      );
    }
    return of(null); // Return a null Observable if not in the browser
  }
}
