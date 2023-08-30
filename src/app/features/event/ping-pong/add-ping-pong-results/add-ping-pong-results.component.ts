import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute } from '@angular/router';
import { PingPongMatch } from '@interfaces/event/games/ping-pong/ping-pong-match';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddGameSetComponent } from '@app/features/event/common/add-game-set/add-game-set.component';
import { NewGameSet } from '@interfaces/event/games/new-game-set';
import { EventType } from '@interfaces/event/event-type';
import { AddPingPongMatch } from '@interfaces/event/games/ping-pong/add-ping-pong-match';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { LanguageService } from '@app/core/services/language/language.service';
import { DeleteSetEvent } from '@interfaces/event/delete-set-event';
import { TOAST_LIFETIME } from '@app/core/constants/messages';

@Component({
  selector: 'app-add-ping-pong-results',
  templateUrl: './add-ping-pong-results.component.html',
  styleUrls: ['./add-ping-pong-results.component.scss'],
})
export class AddPingPongResultsComponent implements OnInit {
  @Input() editable: boolean = true;

  matches: PingPongMatch[] = [];
  addSetDialogRef?: DynamicDialogRef;
  eventUsers: UserDetailsDto[] = [];

  organizationId!: number;
  eventId!: number;

  showAddNewMatch: boolean = false;

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
      .getEventMatches<PingPongMatch[]>(
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
      .getEventUsers(this.eventId, EventType.PING_PONG)
      .subscribe({
        next: (users: UserDetailsDto[]) => {
          this.eventUsers = users;
        },
      });
  }

  handleAddMatch(data: AddPingPongMatch) {
    this.eventsService
      .addPingPongMatch(data.organizationId, data.eventId, data.match)
      .subscribe({
        next: (_) => {
          this.eventsService
            .getEventMatches<PingPongMatch[]>(
              this.organizationId,
              this.eventId,
              EventType.PING_PONG,
            )
            .subscribe({
              next: (matches: PingPongMatch[]) => {
                this.matches = matches;
              },
            });

          this.showAddNewMatch = false;
        },
      });
  }

  openAddSetDialog(matchId: number) {
    const matchIndex = this.matches.findIndex(
      (item: PingPongMatch) => item.id === matchId,
    );
    this.matches[matchIndex].sets = this.matches[matchIndex].sets || [];
    this.addSetDialogRef = this.dialogService.open(AddGameSetComponent, {
      header: this.languageService.instant('event.common.addSet'),
      width: '25rem',
      data: {
        matchId,
        setNr:
          this.matches[matchIndex].sets.sort((a, b) => a.setNr - b.setNr)[
            this.matches[matchIndex].sets.length - 1
          ]?.setNr + 1 || 1,
      },
    });

    this.addSetDialogRef.onClose.subscribe((set: NewGameSet) => {
      if (set) {
        this.matches[
          this.matches.findIndex((item) => item.id === set.matchId)
        ].sets.push(set);

        this.eventsService
          .addPingPongMatchSet(this.organizationId, this.eventId, set.matchId, [
            set,
          ])
          .subscribe({
            next: () => {
              this.fetchMatches();
            },
          });
      }
    });
  }
}
