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
import { categoryTypeToLabel } from '@app/core/utils/event';
import { PullUpsMatch } from '@interfaces/event/games/pull-ups/pull-ups-match';
import { AuthService } from '@app/core/services/auth/auth.service';
import { UsersService } from '@app/core/services/users/users.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TOAST_LIFETIME } from '@app/core/constants/messages';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
})
export class ViewEventComponent implements OnInit {
  eventId!: number;
  organizationId!: number;
  eventType!: EventType;

  event?: EventDto;
  participants: UserDetailsDto[] = [];
  matches?: PingPongMatch[] | TableFootballMatch[] | PullUpsMatch[];
  loggedInUserId!: number;
  canEdit: boolean = false;
  canJoin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private errorsService: ErrorsService,
    private authService: AuthService,
    private usersService: UsersService,
    private messageService: MessageService,
    private languageService: LanguageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['eventId'];
    this.organizationId = this.route.snapshot.params['organizationId'];
    this.eventType = this.route.snapshot.params['type'];

    this.loggedInUserId = this.authService.getUserId() as number;

    this.fetchEvent();
    this.fetchParticipants();
    this.fetchMatches();
  }

  joinEvent() {
    if (!this.event) {
      return;
    }

    this.eventsService
      .joinEvent(this.event.eventId, this.event.eventType)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            life: TOAST_LIFETIME,
            detail: this.languageService.instant('organization.eventJoin'),
          });
          this.event!.participants.push(this.authService.getUserId()!);

          this.usersService.getMe().subscribe({
            next: (me: UserDetailsDto) => {
              this.participants.push(me);
              this.handleCanEdit();
              this.handleCanJoin();
            },
          });
        },
      });
  }

  onRemoveUser(event: Event, user: UserDetailsDto) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      acceptLabel: this.languageService.instant('common.yes'),
      rejectLabel: this.languageService.instant('common.no'),
      icon: 'pi pi-exclamation-triangle',
      message: this.languageService.instant(
        'event.participants.removeQuestion',
      ),
      accept: () => {
        this.eventsService
          .removeEventParticipant(this.eventId, user.id, this.eventType)
          .subscribe({
            next: (participants: UserDetailsDto[]) => {
              this.messageService.add({
                severity: 'success',
                life: TOAST_LIFETIME,
                summary: this.languageService.instant(
                  'event.participants.removeConfirmation',
                ),
              });
              this.participants = participants;
              this.handleCanJoin();
              this.handleCanEdit();
            },
            error: (err) => {
              this.errorsService.createErrorMessage(extractMessage(err));
            },
          });
      },
      reject: () => {},
    });
  }

  leaveEvent() {
    this.eventsService
      .removeEventParticipant(this.eventId, this.loggedInUserId, this.eventType)
      .subscribe({
        next: (participants: UserDetailsDto[]) => {
          this.participants = participants;
          this.handleCanJoin();
          this.handleCanEdit();
          this.messageService.add({
            severity: 'success',
            life: TOAST_LIFETIME,
            detail: this.languageService.instant('organization.eventLeave'),
          });
        },
      });
  }

  handleCanEdit() {
    this.canEdit = this.participants
      .map((u) => u.id)
      .includes(this.loggedInUserId);
  }

  handleCanJoin() {
    this.canJoin =
      (this.event?.eventPublic &&
        !this.participants.map((u) => u.id).includes(this.loggedInUserId)) ||
      false;
  }

  fetchEvent() {
    this.eventsService.getEvent(this.eventId, this.eventType).subscribe({
      next: (event: EventDto) => {
        this.event = event;
        this.handleCanEdit();
        this.handleCanJoin();
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
          this.handleCanEdit();
          this.handleCanJoin();
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

  getTableFootballMatches(): TableFootballMatch[] {
    return this.matches as TableFootballMatch[];
  }

  getPullUpsMatches(): PullUpsMatch[] {
    return this.matches as PullUpsMatch[];
  }

  protected readonly EventType = EventType;
  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
