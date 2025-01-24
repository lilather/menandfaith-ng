import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { UserStateService } from '../users/services/user-state-service';
import { of } from 'rxjs';
import { IUser } from '../users/user.model';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let userStateServiceMock: any;

  beforeEach(async () => {
    userStateServiceMock = {
      getUserObservable: jasmine.createSpy('getUserObservable').and.returnValue(of(null))
    };

    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        { provide: UserStateService, useValue: userStateServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user$ observable', () => {
    const userObservable = component.user$;
    expect(userObservable).toBeDefined();
  });

  it('should retrieve user data from userStateService', (done) => {
    const mockUser: IUser = { userId: '1', email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe', username: 'johndoe' };

    // Update the mock return value before fixture initialization
    userStateServiceMock.getUserObservable.and.returnValue(of(mockUser));

    // Recreate the fixture and detect changes
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Test the observable
    component.user$.subscribe(user => {
      expect(user).toEqual(mockUser);
      done();
    });
  });

  it('should handle null user data from userStateService', (done) => {
    userStateServiceMock.getUserObservable.and.returnValue(of(null));

    component.user$.subscribe(user => {
      expect(user).toBeNull();
      done();
    });
  });
});
