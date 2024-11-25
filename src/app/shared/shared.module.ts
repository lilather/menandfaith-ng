import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModule
import {AlertComponent} from './alert/alert.component'; // Import the AlertComponent
import {ConfirmationModalComponent} from "./confirmation-modal/confirmation-modal.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule, RouterOutlet, NgbModule,AlertComponent, ConfirmationModalComponent
  ],
  exports: [RouterModule, RouterOutlet, CommonModule , NgbModule, AlertComponent, ConfirmationModalComponent]
})
export class SharedModule { }
