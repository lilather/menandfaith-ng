import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { IUser, CreateUserDto, UpdateUserDto } from '../user.model';
import { environment } from './../../../enviroments/enviroment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import HttpClientTestingModule to mock HTTP requests
      providers: [UserService]
    });

    service = TestBed.inject(UserService);  // Inject the service
    httpMock = TestBed.inject(HttpTestingController);  // Inject the HttpTestingController to mock HTTP requests
  });

  afterEach(() => {
    httpMock.verify();  // Ensure that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Check if the service is created
  });

  it('should get all users', () => {
    const mockUsers: IUser[] = [
      { userId: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { userId: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' }
    ];

    service.getAllUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);  // Expect the mock data to be returned
    });

    const req = httpMock.expectOne(`${environment.API_URL}users`);
    expect(req.request.method).toBe('GET');  // Ensure the request method is GET
    req.flush(mockUsers);  // Return mock data
  });

  it('should get user by ID', () => {
    const mockUser: IUser = { userId: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };

    service.getUserById('1').subscribe((user) => {
      expect(user).toEqual(mockUser);  // Expect the mock user to be returned
    });

    const req = httpMock.expectOne(`${environment.API_URL}users/1`);
    expect(req.request.method).toBe('GET');  // Ensure the request method is GET
    req.flush(mockUser);  // Return mock user data
  });

  it('should get current user', () => {
    const mockUser: IUser = { userId: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };

    service.getCurrentUser().subscribe((user) => {
      expect(user).toEqual(mockUser);  // Expect the mock user to be returned
    });

    const req = httpMock.expectOne(`${environment.API_URL}users/current`);
    expect(req.request.method).toBe('GET');  // Ensure the request method is GET
    req.flush(mockUser);  // Return mock user data
  });

  it('should create a user', () => {
    const mockUser: IUser = { username: 'TTT' , userId: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    const createUserDto: CreateUserDto = { username: 'TTT' ,firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: '123456' };

    service.createUser(createUserDto).subscribe((user) => {
      expect(user).toEqual(mockUser);  // Expect the mock user to be returned after creation
    });

    const req = httpMock.expectOne(`${environment.API_URL}users`);
    expect(req.request.method).toBe('POST');  // Ensure the request method is POST
    req.flush(mockUser);  // Return mock user data
  });

  it('should update a user', () => {
    const mockUser: IUser = { userId: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    const updateUserDto: UpdateUserDto = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };

    service.updateUser(updateUserDto).subscribe((user) => {
      expect(user).toEqual(mockUser);  // Expect the updated mock user to be returned
    });

    const req = httpMock.expectOne(`${environment.API_URL}users`);
    expect(req.request.method).toBe('PUT');  // Ensure the request method is PUT
    req.flush(mockUser);  // Return updated mock user data
  });

  it('should delete the current user', () => {
    service.deleteUser().subscribe((res) => {
      expect(res).toBeNull();  // Expect the response to be void (undefined)
    });

    const req = httpMock.expectOne(`${environment.API_URL}users/delete`);
    expect(req.request.method).toBe('DELETE');  // Ensure the request method is DELETE
    req.flush(null);  // No response body for DELETE request
  });
});
