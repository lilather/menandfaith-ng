
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirm event and close dialog on confirm', () => {
    spyOn(component.confirm, 'emit');
    spyOn(component, 'closeDialog');

    component.onConfirm();

    expect(component.confirm.emit).toHaveBeenCalled();
    expect(component.closeDialog).toHaveBeenCalled();
  });

  it('should close dialog and emit visibleChange event on closeDialog', () => {
    spyOn(component.visibleChange, 'emit');

    component.closeDialog();

    expect(component.visible).toBeFalse();
    expect(component.visibleChange.emit).toHaveBeenCalledWith(false);
  });

  it('should initialize with default values', () => {
    expect(component.visible).toBeFalse();
    expect(component.header).toBe('Dialog');
    expect(component.message).toBe('Are you sure?');
    expect(component.width).toBe('500px');
    expect(component.closable).toBeTrue();
  });

  it('should update visible state and emit visibleChange event when visible input changes', () => {
    spyOn(component.visibleChange, 'emit');

    component.visible = true;
    component.visibleChange.emit(component.visible);

    expect(component.visible).toBeTrue();
    expect(component.visibleChange.emit).toHaveBeenCalledWith(true);
  });
});
