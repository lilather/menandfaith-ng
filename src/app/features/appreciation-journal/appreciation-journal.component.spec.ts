import { ComponentFixture, TestBed } from '@angular/core/testing';

import { appreciationJournalComponent } from './appreciation-journal.component';

describe('appreciationJournalComponent', () => {
  let component: appreciationJournalComponent;
  let fixture: ComponentFixture<appreciationJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [appreciationJournalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(appreciationJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
