import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModule


@NgModule({
  declarations: [],
  imports: [ 
    CommonModule, RouterModule, RouterOutlet, NgbModule
  ],
  exports: [RouterModule, RouterOutlet, CommonModule , NgbModule]
})
export class SharedModule { }
