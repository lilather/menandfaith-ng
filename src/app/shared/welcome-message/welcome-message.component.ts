import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss'],
  imports: [ToastModule,CommonModule], // Import ToastModule here
  providers: [MessageService],
})
export class WelcomeMessageComponent implements OnInit {
  @Input() headerMessage: string = 'welcome!';
  @Input() message: string = '';
  @Input() avatarUrl: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.showWelcomeMessage();
  }

  showWelcomeMessage(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Welcome!',
      detail: `Hello, ${this.headerMessage}. We're glad you're here!`,
    });
  }
}
