// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { IUser, CreateUserDto, UpdateUserDto } from '../user.model';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {log} from '../../decorators/log.decorator';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = `${environment.API_URL}/users`; // Use environment variable

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`,{ withCredentials: true });
  }

  createUser(createUserDto: CreateUserDto): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, createUserDto, { withCredentials: true });
  }

  updateUser(updateUserDto: UpdateUserDto): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}`, updateUserDto, { withCredentials: true });
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete `, { withCredentials: true });
  }
  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/current`);
  }
}
