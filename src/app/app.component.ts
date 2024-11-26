import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserStateService } from './users/services/user-state-service';
import {log} from './decorators/log.decorator'
import { IUser } from './users/user.model';
import { isPlatformBrowser } from '@angular/common';


@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [SharedModule]
})
export class AppComponent implements OnInit {
  user: IUser | null = null;

  constructor(private http: HttpClient, private userStateService: UserStateService, @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  @log
  async  ngOnInit(): Promise<void>{
    if (isPlatformBrowser(this.platformId)) {
      await this.userStateService.checkAndFetchUser();
    }

  }
}
