// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { IUser, CreateUserDto, UpdateUserDto } from '../user.model';

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
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/current`, { withCredentials: true }).pipe(
      tap((user) => console.log('Fetched user:', user))  // Log the user response for debugging
    );
  }

  createUser(createUserDto: CreateUserDto): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, createUserDto);
  }

  updateUser(updateUserDto: UpdateUserDto): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}`, updateUserDto);
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete`);
  }
}
