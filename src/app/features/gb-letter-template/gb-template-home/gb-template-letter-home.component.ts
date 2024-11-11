import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LetterService } from '../services/gb-letter-template.service';
import { TemplateLetter } from '../models';

@Component({
  standalone: true,
  selector: 'app-gb-template-letter-home',
  templateUrl: './gb-template-letter-home.component.html',
  styleUrls: ['./gb-template-letter-home.component.scss']
})
export class GbTemplateLetterHomeComponent implements OnInit {
  contentLetters: TemplateLetter[] = [];

  constructor(private letterService: LetterService, private router: Router) {}

  ngOnInit(): void {
    this.letterService.getAllTemplateLetters().subscribe((letters) => {
      this.contentLetters = letters;
    });
  }

  goToDetail(id: string): void {
    this.router.navigate(['goodbye-letter-template/letter-detail', id]);
  }

  goToAdd(): void {
    this.router.navigate(['goodbye-letter-template/letter-add']);
  }
}
