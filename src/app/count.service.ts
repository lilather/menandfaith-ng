import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "./enviroments/environment";

@Injectable({ providedIn: 'root' })
export class countService {
  constructor(private http: HttpClient) {}
  private apiUrl = `${environment.API_URL}/counts`; // Base URL for the NestJS API

  getAllCounts(): Observable<{ letterCount: number }> {
    return this.http.get<{ letterCount: number }>(this.apiUrl);
  }
}
