import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateLetterContentDto,
  UpdateLetterContentDto,
} from './../dtos'; // Adjust the import path to your DTOs
import { ContentLetter } from '../models'; // Adjust the import path to your interfaces
import {environment} from "../../../enviroments/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LetterService {
  private apiUrl = `${environment.API_URL}/letters`; // Base URL for the NestJS API

  constructor(private http: HttpClient) {}

  // Create a content letter
  createContentLetter(createLetterContentDto: CreateLetterContentDto): Observable<ContentLetter> {
    console.log('getting called baby');
     return this.http.post<ContentLetter>(`${this.apiUrl}/content`, createLetterContentDto);
  }



  // Get a content letter by ID
  getContentLetterById(id: string): Observable<ContentLetter> {
    return this.http.get<ContentLetter>(`${this.apiUrl}/content/${id}`);
  }


  getAllContentLetters(): Observable<ContentLetter[]> {
    return this.http.get<ContentLetter[]>(`${this.apiUrl}/content`).pipe(
      map((letters) => letters || [])
    );
  }


  // Update a content letter
  updateContentLetter(id: string, updateLetterContentDto: UpdateLetterContentDto): Observable<ContentLetter> {
    return this.http.put<ContentLetter>(`${this.apiUrl}/content/${id}`, updateLetterContentDto);
  }



  // Delete a content letter
  deleteContentLetter(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/content/${id}`);
  }
}
