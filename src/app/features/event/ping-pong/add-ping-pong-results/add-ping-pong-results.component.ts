import { Component, OnInit } from '@angular/core';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute } from '@angular/router';
import { PingPongMatch } from '@interfaces/event/ping-pong/ping-pong-match';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddPingPongSetComponent } from '@app/features/event/ping-pong/add-ping-pong-set/add-ping-pong-set.component';
import { GameSet } from '@interfaces/event/game-set';

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

  openAddSetDialog() {
    console.log(
      this.matches[0].sets.sort((a, b) => a.setNr - b.setNr)[
        this.matches[0].sets.length - 1
      ],
    );

    this.addSetDialogRef = this.dialogService.open(AddPingPongSetComponent, {
      header: 'Dodaj set',
      width: '25rem',
      data: {
        setNr:
          this.matches[0].sets.sort((a, b) => a.setNr - b.setNr)[
            this.matches[0].sets.length - 1
          ]?.setNr + 1 || 1,
      },
    });

    this.addSetDialogRef.onClose.subscribe((set: GameSet) => {
      if (set) {
        this.matches[0].sets.push(set);
        this.eventsService
          .addMatchSet(this.organizationId, this.eventId, this.matches[0].id, [
            set,
          ])
          .subscribe();
      }
    });
  }
}
