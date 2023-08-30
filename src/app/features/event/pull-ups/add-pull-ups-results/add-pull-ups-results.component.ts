import { Component, OnInit } from '@angular/core';
import { EventsService } from '@app/core/services/events/events.service';
import { PullUpsMatch } from '@interfaces/event/games/pull-ups/pull-ups-match';
import { EventType } from '@interfaces/event/event-type';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddPullUpsSeriesComponent } from '@app/features/event/pull-ups/add-pull-ups-series/add-pull-ups-series.component';
import { NewPullUpsSeries } from '@interfaces/event/games/pull-ups/new-pull-ups-series';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { AddEventUser } from '@interfaces/event/add-event-user';
import { NewPingPongMatch } from '@interfaces/event/games/ping-pong/new-ping-pong-match';
import { NewPullUpsMatch } from '@interfaces/event/games/pull-ups/new-pull-ups-match';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-add-pull-ups-results',
  templateUrl: './add-pull-ups-results.component.html',
  styleUrls: ['./add-pull-ups-results.component.scss'],
})
export class AddPullUpsResultsComponent implements OnInit {
  eventId!: number;
  organizationId!: number;
  addSeriesDialogRef?: DynamicDialogRef;
  matches: PullUpsMatch[] = [];

  showAddNewMatch: boolean = false;
  eventUsers: UserDetailsDto[] = [];
  addedUsers: AddEventUser[] = [];

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['eventId'];
    this.organizationId = this.route.snapshot.params['organizationId'];

    this.fetchMatches();
    this.fetchEventUsers();
  }

  ngOnDestroy(): void {
    this.addSeriesDialogRef?.destroy();
  }

  addUser(user: AddEventUser) {
    if (user) {
      this.addedUsers.push(user);
    }
  }

  removeUser(user: AddEventUser) {
    this.addedUsers = this.addedUsers.filter((item) => item.id !== user.id);
  }

  fetchEventUsers() {
    this.eventsService
      .getEventUsers(this.eventId, EventType.PULL_UPS)
      .subscribe({
        next: (users: UserDetailsDto[]) => {
          this.eventUsers = users;
        },
      });
  }

  fetchMatches() {
    this.eventsService
      .getEventMatches<PullUpsMatch[]>(
        this.organizationId,
        this.eventId,
        EventType.PULL_UPS,
      )
      .subscribe({
        next: (matches) => {
          this.matches = matches;
        },
      });
  }

  openAddSeriesDialog(matchId: number) {
    const matchIndex = this.matches.findIndex(
      (item: PullUpsMatch) => item.id === matchId,
    );
    this.addSeriesDialogRef = this.dialogService.open(
      AddPullUpsSeriesComponent,
      {
        header: this.languageService.instant('event.rounds.addSeries'),
        width: '25rem',
        data: {
          matchId,
          seriesID:
            this.matches[matchIndex].scores.sort(
              (a, b) => a.seriesID - b.seriesID,
            )[this.matches[matchIndex].scores.length - 1]?.seriesID + 1 || 1,
          users: this.matches[matchIndex].userDetailsDtos,
        },
      },
    );

    this.addSeriesDialogRef.onClose.subscribe((series: NewPullUpsSeries) => {
      if (series) {
        const matchIndex = this.matches.findIndex(
          (item) => item.id === series.matchId,
        );

        this.matches[matchIndex].scores = this.matches[
          matchIndex
        ].scores.concat(
          ...series.series.map((item) => ({
            seriesID: item.seriesID,
            score: item.result,
            userId: item.userId,
          })),
        );

        this.eventsService
          .addPullUpsSeries(
            this.organizationId,
            this.eventId,
            series.matchId,
            this.matches[matchIndex].scores,
          )
          .subscribe({
            next: (match: PullUpsMatch) => {
              this.matches[matchIndex] = match;
            },
          });
      }
    });
  }

  addMatch() {
    const newMatch: NewPullUpsMatch = {
      team1Ids: this.addedUsers.map((i) => i.id),
      team2Ids: [],
      team3Approval: false,
      team1Approval: false,
      team2Approval: false,
    };

    this.addedUsers = [];
    this.showAddNewMatch = false;

    this.eventsService
      .addPullUpsMatch(this.organizationId, this.eventId, newMatch)
      .subscribe({
        next: (match: PullUpsMatch) => {
          this.fetchMatches();
        },
      });
  }
}
