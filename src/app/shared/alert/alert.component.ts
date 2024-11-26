import { Component, Input  } from '@angular/core';

@Component({
    selector: 'app-alert',
    imports: [],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() type: string = 'success'; // Alert type (success, danger, warning, etc.)
  @Input() title: string = ''; // Alert title
  @Input() message: string = ''; // Alert message
  visible: boolean = true; // Control visibility of the alert

  close(): void {
    this.visible = false;
  }
}
