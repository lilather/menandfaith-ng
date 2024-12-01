import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import {DialogModule} from "primeng/dialog";

@Component({
  standalone: true,
  selector: 'app-dialog',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['confirmation-modal.component.css'],
  providers: [ConfirmationService, MessageService],
  imports: [CommonModule, ConfirmDialogModule, ButtonModule, MessagesModule, MessageModule, DialogModule],
})
export class DialogComponent {
  @Input() visible: boolean = false;
  @Input() header: string = 'Dialog';
  @Input() message: string = 'Are you sure?';
  @Input() width: string = '500px';
  @Input() closable: boolean = true;
  @Output() confirm = new EventEmitter<void>(); // Output event to notify parent component on confirm action

  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }


  onConfirm() {
    // Perform the desired action on confirmation
    this.confirm.emit(); // Emit the confirm event to the parent component
    this.closeDialog(); // Close the dialog after confirming
  }
}
