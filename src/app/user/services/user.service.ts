import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getUser(): Promise<any> {

    try {
      const response = await fetch('http://localhost:3000/users/current', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request if necessary
      });

      // Get the current timestamp
      const timestamp = new Date().toLocaleString();
      console.log(`Response received at ${timestamp}:`, response.ok);
      console.log(`Response received at ${timestamp}:`, response.status);

      // Check if the response is OK
      if (response.ok) {
        const timestamp = new Date().toLocaleString();
        const userData = await response.json();
        console.log(`Success at ${timestamp}:`, userData);
        return userData;
      } else {
        // Log the failure and return the status code
        //console.log(`Failed at ${timestamp}: Status ${response.status}`);
        return response.status;  // Return status code on failure
      }
    } catch (error) {
      // Log the error with the current timestamp
      const timestamp = new Date().toLocaleString();
      console.log(`Error at ${timestamp}:`, error);
      return null;  // Return null or handle the error appropriately
    }
  }

  async getAllUsers(): Promise<any> {
      try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'GET',
            credentials: 'include', // Include cookies in the request if necessary
        });
  
        // Get the current timestamp
        const timestamp = new Date().toLocaleString();
        console.log(`Response received at ${timestamp}:`, response.ok);
        console.log(`Response received at ${timestamp}:`, response.status);
  
        // Check if the response is OK
        if (response.ok) {
          const timestamp = new Date().toLocaleString();
          const userData = await response.json();
          console.log(`Success at ${timestamp}:`, userData);
          return userData;
        } else {
          // Log the failure and return the status code
          //console.log(`Failed at ${timestamp}: Status ${response.status}`);
          return response.status;  // Return status code on failure
        }
      } catch (error) {
        // Log the error with the current timestamp
        const timestamp = new Date().toLocaleString();
        console.log(`Error at ${timestamp}:`, error);
        return null;  // Return null or handle the error appropriately
      }
  }

}
