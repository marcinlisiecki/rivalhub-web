import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '@app/core/services/language/language.service';
import { EventType } from '@interfaces/event/event-type';
import { BilliardsMatch } from '@interfaces/event/games/billiards/billiards-match';
import { AddPingPongMatch } from '@interfaces/event/games/ping-pong/add-ping-pong-match';
import { AddBilliardsMatchComponent } from '@app/features/event/billiards/add-billiards-match/add-billiards-match.component';
import { NewBilliardsMatchDialog } from '@interfaces/event/games/billiards/new-billiards-match-dialog';
import { NewBilliardsMatch } from '@interfaces/event/games/billiards/new-billiards-match';
import { BilliardsResult } from '@interfaces/event/games/billiards/billiards';
import { NewBilliardsResults } from '@interfaces/event/games/billiards/new-billiards-results';

@Component({
  selector: 'app-add-billiards-results',
  templateUrl: './add-billiards-results.component.html',
  styleUrls: ['./add-billiards-results.component.scss'],
})
export class AddBilliardsResultsComponent {
  @Input() editable: boolean = true;

  matches: BilliardsMatch[] = [];
  eventUsers: UserDetailsDto[] = [];
  addMatchDialogRef?: DynamicDialogRef;

  organizationId!: number;
  eventId!: number;

  showAddUsers: boolean = false;
  showAddNewMatch: boolean = false;

  newMatchTeam1: number[] = [];
  newMatchTeam2: number[] = [];

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.params['organizationId'];
    this.eventId = this.route.snapshot.params['eventId'];

    this.fetchMatches();
    this.fetchEventUsers();
  }

  ngOnDestroy(): void {
    this.addMatchDialogRef?.destroy();
  }

  fetchMatches() {
    this.eventsService
      .getEventMatches<BilliardsMatch[]>(
        this.organizationId,
        this.eventId,
        EventType.BILLIARDS,
      )
      .subscribe({
        next: (matches) => {
          this.matches = matches;
        },
      });
  }

  fetchEventUsers() {
    this.eventsService
      .getEventUsers(this.eventId, EventType.BILLIARDS)
      .subscribe({
        next: (users: UserDetailsDto[]) => {
          this.eventUsers = users;
        },
      });
  }

  addNewEventUsers(newEvent: AddPingPongMatch) {
    this.addMatchDialogRef = this.dialogService.open(
      AddBilliardsMatchComponent,
      {
        header: this.languageService.instant('event.addGame'),
        data: {},
      },
    );

    this.addMatchDialogRef.onClose.subscribe(
      (match: NewBilliardsMatchDialog) => {
        if (match) {
          const newMatch: NewBilliardsMatch = {
            team1Ids: newEvent.match.team1Ids,
            team2Ids: newEvent.match.team2Ids,
          };

          this.eventsService
            .addBilliardsMatch(this.organizationId, this.eventId, newMatch)
            .subscribe({
              next: (createdMatch: BilliardsMatch) => {
                const results: NewBilliardsResults = {
                  howManyBillsLeftTeam1: match.howManyBillsLeftTeam1,
                  howManyBillsLeftTeam2: match.howManyBillsLeftTeam2,
                  team1HadPottedFirst: false,
                  team1PlaysFull: false,
                  team1Won: match.team1Won,
                  team2Won: match.team2Won,
                  winType: match.winType,
                };

                this.eventsService
                  .addBilliardsResults(
                    this.organizationId,
                    this.eventId,
                    createdMatch.id,
                    results,
                  )
                  .subscribe({
                    next: (updatedMatch) => {
                      this.matches.push(updatedMatch);
                    },
                  });
              },
            });
        }

        this.showAddUsers = false;
        this.showAddNewMatch = false;
      },
    );
  }
}
