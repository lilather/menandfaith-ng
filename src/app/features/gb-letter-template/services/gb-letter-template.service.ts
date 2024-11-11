import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateLetterTemplateDto,
  UpdateLetterTemplateDto,

} from '../dtos'; // Adjust the import path to your DTOs
import { TemplateLetter } from '../models'; // Adjust the import path to your interfaces
import {environment} from "../../../enviroments/environment";

@Injectable({
  providedIn: 'root',
})
export class LetterService {
  private apiUrl = `${environment.API_URL}/letters`; // Base URL for the NestJS API

  constructor(private http: HttpClient) {}

  // Create a template letter
  createTemplateLetter(createLetterTemplateDto: CreateLetterTemplateDto): Observable<TemplateLetter> {
    return this.http.post<TemplateLetter>(`${this.apiUrl}/template`, createLetterTemplateDto);
  }



  // Get a template letter by ID
  getTemplateLetterById(id: string): Observable<TemplateLetter> {
    return this.http.get<TemplateLetter>(`${this.apiUrl}/template/${id}`);
  }



  // Get all template letters for the current user
  getAllTemplateLetters(): Observable<TemplateLetter[]> {
    return this.http.get<TemplateLetter[]>(`${this.apiUrl}/template`);
  }



  // Update a template letter
  updateTemplateLetter(id: string, updateLetterTemplateDto: UpdateLetterTemplateDto): Observable<TemplateLetter> {
    return this.http.put<TemplateLetter>(`${this.apiUrl}/template/${id}`, updateLetterTemplateDto);
  }



  // Delete a template letter
  deleteTemplateLetter(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/template/${id}`);
  }


}
