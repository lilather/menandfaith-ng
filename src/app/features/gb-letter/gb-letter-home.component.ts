import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { templateLetterStateService } from '../gb-letter/gb-letter-template/services/gb-letter-template-state-service';
import { contentLetterStateService } from '../gb-letter/gb-letter-content/services/gb-letter-content.state-service';
import { TemplateLetter, ContentLetter } from  './models';
import {combineLatest, map, Observable} from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {WelcomeMessageComponent} from "../../shared/welcome-message/welcome-message.component"; // Adjust path
import { UserStateService } from './../../users/services/user-state-service';
import { IUser } from './../../users/user.model';
import { DatePipe } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-gb-letter-home',
  templateUrl: './gb-letter-home.component.html',
  styleUrls: ['./gb-letter-home.component.scss'],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    WelcomeMessageComponent,
    RouterLink,
  ],
  providers: [DatePipe]
})
export class GbLetterHomeComponent implements OnInit {
  templateLetters$!: Observable<TemplateLetter[]>;
  contentLetters$!: Observable<ContentLetter[]>;
  combinedLetters$!: Observable<any[]>;

  currentUser: IUser | null = null;
  constructor(
    private templateStateService: templateLetterStateService,
    private contentStateService: contentLetterStateService,
    private router: Router,
    private userStateService:UserStateService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Load Template Letters
    this.templateLetters$ = this.templateStateService.templateLetters$;
    this.templateStateService.loadTemplateLetters();

    // Load Content Letters
    this.contentLetters$ = this.contentStateService.contentLetters$;
    this.contentStateService.loadContentLetters();

    // Combine both observables for template and content letters
    // Combine both observables for template and content letters
    this.combinedLetters$ = combineLatest([this.templateLetters$, this.contentLetters$]).pipe(
      map(([templateLetters, contentLetters]) => {
        // Add an `isContentLetter` flag to each letter for conditional styling
        return [
          ...templateLetters.map(letter => ({ ...letter, isContentLetter: false })),
          ...contentLetters.map(letter => ({ ...letter, isContentLetter: true }))
        ];
      })
    );


    this.userStateService.checkAndFetchUser()
      .then(() => {
        // Once fetched, retrieve the current user from the state
        this.currentUser = this.userStateService.getCurrentUser();
      }).then(() => { console.log(`this is the current user ${this.currentUser}`) });

  }

  // Add and Detail Navigation
  goToTemplateAdd(): void {
    this.router.navigate(['goodbye-letter/template/letter-add']).catch((error) => {
      console.error('Error navigating to add template letter:', error);
    });
  }

  goToContentAdd(): void {
    this.router.navigate(['goodbye-letter/content/letter-add']).catch((error) => {
      console.error('Error navigating to add content letter:', error);
    });
  }

  goToTemplateDetail(id: string | undefined): void {
    if (!id) {
      console.warn('Template letter ID is undefined.');
      return;
    }
    this.router.navigate([`goodbye-letter/template/letter-detail/${id}`]).catch((error) => {
      console.error('Error navigating to template detail:', error);
    });
  }

  goToContentDetail(id: string | undefined): void {
    if (!id) {
      console.warn('Content letter ID is undefined.');
      return;
    }
    this.router.navigate([`goodbye-letter/content/letter-detail/${id}`]).catch((error) => {
      console.error('Error navigating to content detail:', error);
    });
  }

  public getDateText(letter: any): string {
    const createdDate = this.datePipe.transform(letter.createdAt, 'short');
    const updatedDate = this.datePipe.transform(letter.updatedAt, 'short');

    return letter.createdAt === letter.updatedAt
      ? `Created at ${createdDate}`
      : `Updated at ${updatedDate}`;
  }
}

