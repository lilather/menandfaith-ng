import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private userSubject = new BehaviorSubject<any>(null);  // A BehaviorSubject to store user data
  public user$: Observable<any> = this.userSubject.asObservable();  // Observable for user data

  constructor() {}

  // Set the user data
  setUser(user: any): void {
    this.userSubject.next(user);
  }

  // Get the current user value
  getUserValue(): any {
    return this.userSubject.getValue();
  }
}
