import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  standalone: true,
  imports: [DialogModule, ButtonModule],
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() confirmButtonLabel: string = 'Yes';
  @Input() cancelButtonLabel: string = 'No';

  @Output() onConfirm: EventEmitter<void> = new EventEmitter();
  @Output() onCancel: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {}

  confirm(): void {
    this.onConfirm.emit();
    this.visible = false;
  }

  cancel(): void {
    this.onCancel.emit();
    this.visible = false;
  }
}
