import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '@app/core/services/events/events.service';
import { EventType } from '@interfaces/event/event-type';
import { EventDto } from '@interfaces/event/event-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorsService } from '@app/core/services/errors/errors.service';
import { extractMessage } from '@app/core/utils/apiErrors';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { PingPongMatch } from '@interfaces/event/games/ping-pong/ping-pong-match';
import { TableFootballMatch } from '@interfaces/event/games/table-football/table-football-match';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
})
export class EventViewComponent implements OnInit {
  eventId!: number;
  organizationId!: number;
  eventType!: EventType;

  event?: EventDto;
  participants: UserDetailsDto[] = [];
  matches?: PingPongMatch[] | TableFootballMatch[];

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private errorsService: ErrorsService,
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['eventId'];
    this.organizationId = this.route.snapshot.params['organizationId'];
    this.eventType = this.route.snapshot.params['type'];

    this.fetchEvent();
    this.fetchParticipants();
    this.fetchMatches();
  }

  fetchEvent() {
    this.eventsService.getEvent(this.eventId, this.eventType).subscribe({
      next: (event: EventDto) => {
        this.event = event;
      },
      error: (err: HttpErrorResponse) => {
        this.errorsService.createErrorMessage(extractMessage(err));
      },
    });
  }

  fetchParticipants() {
    this.eventsService
      .getEventParticipants(this.eventId, this.eventType)
      .subscribe({
        next: (participants: UserDetailsDto[]) => {
          this.participants = participants;
        },
        error: (err: HttpErrorResponse) => {
          this.errorsService.createErrorMessage(extractMessage(err));
        },
      });
  }

  fetchMatches() {
    this.eventsService
      .getEventMatches(this.organizationId, this.eventId, this.eventType)
      .subscribe({
        next: (matches) => {
          this.matches = matches;
        },
      });
  }

  getPingPongMatches(): PingPongMatch[] {
    return this.matches as PingPongMatch[];
  }

  protected readonly EventType = EventType;
}
