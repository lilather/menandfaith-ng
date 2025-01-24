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
  styleUrls: ['./confirmation-modal.component.css'],
  imports: [CommonModule, DialogModule, ButtonModule]
})
export class DialogComponent {
  @Input() visible: boolean = false; // Dialog visibility
  @Input() header: string = 'Dialog'; // Dialog header
  @Input() message: string = 'Are you sure?'; // Dialog message
  @Input() dialogClass: string = ''; // Additional class for styling
  @Input() width: string = '500px'; // Dialog width
  @Input() closable: boolean = true; // Allow closing dialog via close button

  @Output() confirm = new EventEmitter<void>(); // Emit when confirmed
  @Output() visibleChange = new EventEmitter<boolean>(); // Emit visibility change

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onConfirm() {
    this.confirm.emit(); // Emit confirmation event
    this.closeDialog(); // Close dialog after confirming
  }
}
