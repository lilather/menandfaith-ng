import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LetterService } from '../services/gb-letter-content.service';
import { ContentLetter } from '../models';
import { SlicePipe } from "@angular/common";
import { CommonModule } from "@angular/common";
import { log } from "../../../decorators/log.decorator";  // Import the ContentLetter mod
import { CreateLetterContentDto } from "../dtos";
import { firstValueFrom } from 'rxjs';
import {ConfirmationModalComponent} from "../../../shared/confirmation-modal/confirmation-modal.component";
@Component({
  standalone: true,
  selector: 'app-gb-content-letter-home',
  templateUrl: './gb-content-letter-home.component.html',
  imports: [
    SlicePipe,
    CommonModule,
    ConfirmationModalComponent
  ],
  styleUrls: ['./gb-content-letter-home.component.scss']
})

export class GbContentLetterHomeComponent implements OnInit {
  contentLetters: ContentLetter[] = [];

  constructor(private letterService: LetterService, private router: Router) {}

  @log
  ngOnInit(): void {
    this.letterService.getAllContentLetters().subscribe((letters) => {
      this.contentLetters = [...letters ];
    });
  };

  @log
  goToDetail(id: string): void {
    console.log('Navigating to detail page for letter:', this.contentLetters);
    this.router.navigate(['goodbye-letter-content/letter-detail', id])
      .then(success => {
        if (success) {
          console.log('Navigation to detail page was successful!');
        } else {
          console.error('Navigation to detail page failed!');
        }
      });
  }

  @log
  async goToAdd(): Promise<void> {
    try {
      const success = await this.router.navigate(['goodbye-letter-content/letter-add']);
      if (success) {
        console.log('Navigation to add page was successful!');
      } else {
        console.error('Navigation to add page failed!');
      }
    } catch (error) {
      console.error('Error creating letter:', error);
    }
  }
}
