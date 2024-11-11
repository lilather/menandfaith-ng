import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyJournalComponent } from './daily-journal.component';

describe('DailyJournalComponent', () => {
  let component: DailyJournalComponent;
  let fixture: ComponentFixture<DailyJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyJournalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
