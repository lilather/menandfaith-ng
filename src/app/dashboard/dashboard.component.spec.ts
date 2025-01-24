import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Add this for HttpClient
import { RouterTestingModule } from '@angular/router/testing'; // Mock RouterModule
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let routerMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent, // Import the standalone component
        HttpClientModule,   // Add HttpClientModule
        RouterTestingModule // Use RouterTestingModule for mocking routes
      ],
      providers: [
        { provide: Router, useValue: routerMock } // Provide mock Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the given path', () => {
    const path = '/test-path';
    component.navigateTo(path);
    expect(routerMock.navigate).toHaveBeenCalledWith([path]);
  });
});

