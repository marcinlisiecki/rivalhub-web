import { Component, OnInit } from '@angular/core';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute } from '@angular/router';
import { PingPongMatch } from '@interfaces/event/games/ping-pong/ping-pong-match';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddPingPongSetComponent } from '@app/features/event/ping-pong/add-ping-pong-set/add-ping-pong-set.component';
import { NewGameSet } from '@interfaces/event/games/new-game-set';
import { EventType } from '@interfaces/event/event-type';
import { AddPingPongMatch } from '@interfaces/event/games/ping-pong/add-ping-pong-match';

@Component({
  selector: 'app-add-ping-pong-results',
  templateUrl: './add-ping-pong-results.component.html',
  styleUrls: ['./add-ping-pong-results.component.scss'],
})
export class AddPingPongResultsComponent implements OnInit {
  matches: PingPongMatch[] = [];
  addSetDialogRef?: DynamicDialogRef;

  organizationId!: number;
  eventId!: number;
  showAddNewMatch: boolean = false;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.params['organizationId'];
    this.eventId = this.route.snapshot.params['eventId'];

    this.eventsService
      .getEventMatches(this.organizationId, this.eventId)
      .subscribe({
        next: (matches: PingPongMatch[]) => {
          this.matches = matches;
        },
      });
  }

  handleAddMatch(data: AddPingPongMatch) {
    this.eventsService
      .addEventMatch(
        data.organizationId,
        data.eventId,
        EventType.PING_PONG,
        data.match,
      )
      .subscribe({
        next: (res) => {
          this.eventsService
            .getEventMatches(this.organizationId, this.eventId)
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
    const matchIndex = this.matches.findIndex((item) => item.id === matchId);
    this.matches[matchIndex].sets = this.matches[matchIndex].sets || [];
    this.addSetDialogRef = this.dialogService.open(AddPingPongSetComponent, {
      header: 'Dodaj set',
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
          .addMatchSet(this.organizationId, this.eventId, set.matchId, [set])
          .subscribe();
      }
    });
  }
}
