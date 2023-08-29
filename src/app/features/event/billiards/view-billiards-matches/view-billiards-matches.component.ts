import { Component, Input } from '@angular/core';
import { BilliardsMatch } from '@interfaces/event/games/billiards/billiards-match';
import { EventType } from '@interfaces/event/event-type';
import { LanguageService } from '@app/core/services/language/language.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { WinType } from '@interfaces/event/games/billiards/billiards-win-type';

@Component({
  selector: 'app-view-billiards-matches',
  templateUrl: './view-billiards-matches.component.html',
  styleUrls: ['./view-billiards-matches.component.scss'],
})
export class ViewBilliardsMatchesComponent {
  @Input({ required: true }) matches!: BilliardsMatch[];
  @Input() editable: boolean = false;

  mockMatches!: BilliardsMatch[];
  loggedInUserId!: number;

  constructor(
    public languageService: LanguageService,
    private authService: AuthService,
  ) {
    this.loggedInUserId = authService.getUserId() as number;

    this.mockMatches = [
      {
        userApprovalMap: { 1: true, 2: true },
        approved: true,
        eventId: 1,
        id: 1,
        eventType: EventType.BILLIARDS,
        howManyBillsLeftTeam1: 0,
        howManyBillsLeftTeam2: 4,
        team1: [
          {
            name: 'Marcin',
            id: 1,
            activationTime: null,
            email: 'xd',
            profilePictureUrl: 'null',
          },
        ],
        team2: [
          {
            name: 'Marcin2',
            id: 2,
            activationTime: null,
            email: 'xd',
            profilePictureUrl: '',
          },
        ],
        team1HadPottedFirst: true, // czy pierwszy wbił bilę
        team1PlaysFull: false, // czy pierwszy gra pełnymi
        team1Won: true, // 2x false
        team2Won: false,
        winType: WinType.FOUL_BILL8_IN,
      },
    ];
  }

  protected readonly WinType = WinType;
}
