import { Component, Input } from '@angular/core';
import { BilliardsMatch } from '@interfaces/event/games/billiards/billiards-match';
import { EventType } from '@interfaces/event/event-type';

@Component({
  selector: 'app-view-billiards-matches',
  templateUrl: './view-billiards-matches.component.html',
  styleUrls: ['./view-billiards-matches.component.scss'],
})
export class ViewBilliardsMatchesComponent {
  @Input({ required: true }) matches!: BilliardsMatch[];
  mockMatches!: BilliardsMatch[];
  @Input() editable: boolean = false;

  constructor() {
    this.mockMatches = [
      {
        eventId: 1,

        eventType: EventType.BILLIARDS,
        howManyBillsLeftTeam1: 0,
        howManyBillsLeftTeam2: 4,
        team1: [
          {
            name: 'Marcin',
            id: 1,
            activationTime: null,
            email: 'xd',
            profilePictureUrl: '',
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
        winType: 'ALL_IN',
      },
    ];
  }
}
