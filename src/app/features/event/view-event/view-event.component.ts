import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { DartsLeg } from '@app/core/interfaces/event/games/darts/dart-leg';
import { FakeDartsLeg } from '@app/core/interfaces/event/games/darts/fake-darts-leg';
import { AuthService } from '@app/core/services/auth/auth.service';
import { UsersService } from '@app/core/services/users/users.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TOAST_LIFETIME } from '@app/core/constants/messages';
import { LanguageService } from '@app/core/services/language/language.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUserDialogComponent } from '@app/features/event/new-event/add-user-dialog/add-user-dialog.component';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { PagedResponse } from '@interfaces/generic/paged-response';
import { ex } from '@fullcalendar/core/internal-common';
import { BilliardsMatch } from '@interfaces/event/games/billiards/billiards-match';

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
  organizationUsers: UserDetailsDto[] = [];
  participants: UserDetailsDto[] = [];
  matches?:
    | PingPongMatch[]
    | TableFootballMatch[]
    | PullUpsMatch[]
    | BilliardsMatch[]
    | FakeDartsLeg[];
  loggedInUserId!: number;
  canEdit: boolean = false;
  canJoin: boolean = false;

  addUserDialogRef?: DynamicDialogRef;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private errorsService: ErrorsService,
    private authService: AuthService,
    private usersService: UsersService,
    private messageService: MessageService,
    private languageService: LanguageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dialogService: DialogService,
    private organizationsService: OrganizationsService,
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['eventId'];
    this.organizationId = this.route.snapshot.params['organizationId'];
    this.eventType = this.route.snapshot.params['type'];

    this.loggedInUserId = this.authService.getUserId() as number;

    this.fetchEvent();
    this.fetchParticipants();
    this.fetchOrganizationUsers();
    this.fetchMatches();
  }

  approveMatch(matchId: number) {
    this.eventsService
      .approveMatch(this.organizationId, this.eventId, matchId, this.eventType)
      .subscribe({
        next: () => {
          const matchIndex = this.matches?.findIndex((m) => m.id === matchId);
          if (this.matches && matchIndex) {
            const loggedInUserId = this.authService.getUserId() as number;
            this.matches[matchIndex].userApprovalMap[loggedInUserId] = true;
          }

          this.fetchMatches();
        },
        error: (err: HttpErrorResponse) => {
          this.errorsService.createErrorMessage(extractMessage(err));
        },
      });
  }

  openAddUserDialog() {
    const users: UserDetailsDto[] = [];
    this.organizationUsers.forEach((user) => {
      let exists = false;

      this.participants.forEach((participant) => {
        if (participant.id === user.id) {
          exists = true;
        }
      });

      if (!exists) {
        users.push(user);
      }
    });

    this.addUserDialogRef = this.dialogService.open(AddUserDialogComponent, {
      data: {
        require3Characters: true,
        userList: users,
      },
      header: this.languageService.instant('event.addUser'),
      width: '25rem',
    });

    this.addUserDialogRef.onClose.subscribe((user?: UserDetailsDto) => {
      if (user) {
        this.eventsService
          .addEventParticipant(this.eventId, user.id, this.eventType)
          .subscribe({
            next: (participants: UserDetailsDto[]) => {
              this.messageService.add({
                severity: 'success',
                life: TOAST_LIFETIME,
                summary: this.languageService.instant(
                  'event.participants.addConfirmation',
                ),
              });
              this.participants = participants;
              this.handleCanJoin();
              this.handleCanEdit();
            },
            error: (err: HttpErrorResponse) => {
              this.errorsService.createErrorMessage(extractMessage(err));
            },
          });
      }
    });
  }

  fetchOrganizationUsers() {
    this.organizationsService
      .getUsers(this.organizationId, 0, 10000)
      .subscribe({
        next: (users: PagedResponse<UserDetailsDto>) => {
          this.organizationUsers = users.content;
        },
      });
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

  onRemoveEvent(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      acceptLabel: this.languageService.instant('common.yes'),
      rejectLabel: this.languageService.instant('common.no'),
      icon: 'pi pi-exclamation-triangle',
      message: this.languageService.instant('event.deleteQuestion'),
      accept: () => {
        this.eventsService
          .removeEvent(this.organizationId, this.eventId, this.eventType)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                life: TOAST_LIFETIME,
                summary: this.languageService.instant(
                  'event.removeConfirmation',
                ),
              });
              this.router.navigateByUrl(
                `/organizations/${this.organizationId}/events`,
              );
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

  getDartsMatches(): DartsLeg[] {
    const mappedMatches: DartsLeg[] = [];
    this.matches?.forEach((element) => {
      const mappedMatch = this.eventsService.mapDartsMatch(
        element as FakeDartsLeg,
      );
      if (mappedMatch) {
        mappedMatches.push(mappedMatch);
      }
    });
    return mappedMatches;
  }

  getBilliardsMatches(): BilliardsMatch[] {
    return this.matches as BilliardsMatch[];
  }

  protected readonly EventType = EventType;
  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
