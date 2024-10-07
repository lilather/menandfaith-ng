// user.model.ts
export interface IUser {
    userId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
 // user.model.ts
export class CreateUserDto {
    username: string = '';
    password: string = '';
    email: string = '';
    firstName: string = '';
    lastName: string = '';
  }
  
  export class UpdateUserDto {
    username?: string = '';
    email?: string = '';
    firstName?: string = '';
    lastName?: string = '';
  }
  