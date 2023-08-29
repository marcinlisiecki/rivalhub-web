import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '@app/core/services/language/language.service';
import { EventType } from '@interfaces/event/event-type';
import { BilliardsMatch } from '@interfaces/event/games/billiards/billiards-match';
import { AddPingPongMatch } from '@interfaces/event/games/ping-pong/add-ping-pong-match';
import { WinType } from '@interfaces/event/games/billiards/billiards-win-type';
import { PullUpsMatch } from '@interfaces/event/games/pull-ups/pull-ups-match';
import { AddPullUpsSeriesComponent } from '@app/features/event/pull-ups/add-pull-ups-series/add-pull-ups-series.component';
import { NewPullUpsSeries } from '@interfaces/event/games/pull-ups/new-pull-ups-series';
import { AddBilliardsMatchComponent } from '@app/features/event/billiards/add-billiards-match/add-billiards-match.component';

@Component({
  selector: 'app-add-billiards-results',
  templateUrl: './add-billiards-results.component.html',
  styleUrls: ['./add-billiards-results.component.scss'],
})
export class AddBilliardsResultsComponent {
  @Input() editable: boolean = true;

  matches: BilliardsMatch[] = [];
  addSetDialogRef?: DynamicDialogRef;
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
    this.addSetDialogRef?.destroy();
  }

  fetchMatches() {
    this.eventsService
      .getEventMatches<BilliardsMatch[]>(
        this.organizationId,
        this.eventId,
        EventType.PING_PONG,
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
    // const matchIndex = this.matches.findIndex(
    //   (item: PullUpsMatch) => item.id === matchId,
    // );
    this.addMatchDialogRef = this.dialogService.open(
      AddBilliardsMatchComponent,
      {
        header: this.languageService.instant('event.rounds.addSeries'),
        data: {},
      },
    );

    // this.addSeriesDialogRef.onClose.subscribe((series: NewPullUpsSeries) => {
    //   if (series) {
    //     const matchIndex = this.matches.findIndex(
    //       (item) => item.id === series.matchId,
    //     );
    //
    //     this.matches[matchIndex].scores = this.matches[
    //       matchIndex
    //       ].scores.concat(
    //       ...series.series.map((item) => ({
    //         seriesID: item.seriesID,
    //         score: item.result,
    //         userId: item.userId,
    //       })),
    //     );
    //
    //     this.eventsService
    //       .addPullUpsSeries(
    //         this.organizationId,
    //         this.eventId,
    //         series.matchId,
    //         this.matches[matchIndex].scores,
    //       )
    //       .subscribe({
    //         next: (match: PullUpsMatch) => {
    //           this.matches[matchIndex] = match;
    //         },
    //       });
    //   }
    // });
  }
}
