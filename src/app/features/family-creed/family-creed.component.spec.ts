import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyCreedComponent } from './family-creed.component';

describe('FamilyCreedComponent', () => {
  let component: FamilyCreedComponent;
  let fixture: ComponentFixture<FamilyCreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyCreedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyCreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
