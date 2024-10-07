import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { environment } from './..//enviroments/enviroment';

describe('AppComponent', () => {
  let fixture:any;
  let component: AppComponent;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,  // Mock HTTP requests
        RouterTestingModule,      // Mock Router services
        AppComponent              // Standalone component
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);  // Create component
    component = fixture.componentInstance;            // Get the component instance
    httpTestingController = TestBed.inject(HttpTestingController);  // Inject the HTTP mock
  });

  afterEach(() => {
    // Ensure no outstanding requests, only if HTTP calls are expected
    httpTestingController.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();  // Ensure the component is created
  });

  it('should have the title "ng-menandfaith"', () => {
    expect(component.title).toEqual('ng-menandfaith');  // Check the title
  });

  it('should call API and update status message on success', () => {
    fixture.detectChanges();  // Trigger ngOnInit() and the API call
    const mockResponse = { status: 'API is working!' };  // Mock API response

    const req = httpTestingController.expectOne(`${component.apiUrl}/status`);  // Expect one request to /status
    req.flush(mockResponse);  // Simulate a successful response

    expect(component.apiStatusMessage).toBe('API is working!');  // Check the result
  });

  it('should update status message on API error', () => {
    fixture.detectChanges();  // Trigger ngOnInit() and the API call

    const req = httpTestingController.expectOne(`${component.apiUrl}/status`);  // Expect one request to /status
    req.flush(null, { status: 500, statusText: 'Server Error' });  // Simulate a failed response

    expect(component.apiStatusMessage).toBe('API is not working!');  // Check the error message
  });

  it('should validate API response data', () => {
    fixture.detectChanges();  // Trigger ngOnInit() and the API call

    const mockResponse = { status: 'API is working!' };  // Mock response with status

    const req = httpTestingController.expectOne(`${component.apiUrl}/status`);  // Expect one request to /status
    req.flush(mockResponse);  // Simulate a successful response

    expect(component.apiStatusMessage).toBe('API is working!');  // Check the success message
    expect(mockResponse.status).toBe('API is working!');  // Ensure the data from the API response is correct
  });
});
