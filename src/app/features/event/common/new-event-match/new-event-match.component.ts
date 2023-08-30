import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';
import { AddEventUser } from '@interfaces/event/add-event-user';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUserDialogComponent } from '@app/features/event/new-event/add-user-dialog/add-user-dialog.component';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { AuthService } from '@app/core/services/auth/auth.service';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { ActivatedRoute } from '@angular/router';
import { PagedResponse } from '@interfaces/generic/paged-response';
import { EventsService } from '@app/core/services/events/events.service';
import { EventType } from '@interfaces/event/event-type';
import { AddPingPongMatch } from '@interfaces/event/games/ping-pong/add-ping-pong-match';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-new-event-match',
  templateUrl: './new-event-match.component.html',
  styleUrls: ['./new-event-match.component.scss'],
})
export class NewEventMatchComponent implements OnInit {
  teams: AddEventUser[][] = [[], []];
  userList: UserDetailsDto[] = [];
  notAddedUserList: UserDetailsDto[] = [];
  @Input() teamCount: number = 2;
  @Input() providedUsers: UserDetailsDto[] = [];
  @Input() fetchUsers: boolean = true;
  @Input() peopleCount = 2;

  loggedInUserId!: number | null;

  addUserDialogRef?: DynamicDialogRef;

  @Output() addMatch: EventEmitter<AddPingPongMatch> =
    new EventEmitter<AddPingPongMatch>();

  constructor(
    private dialogService: DialogService,
    private authService: AuthService,
    private organizationsService: OrganizationsService,
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private languageService: LanguageService,
  ) {
    this.loggedInUserId = authService.getUserId();
  }

  ngOnInit() {
    if (this.fetchUsers) {
      this.fetchUserList();
    } else {
      this.userList = this.providedUsers;
      this.notAddedUserList = this.getOnlyNotAddedUserList();
    }
  }

  removeUser(teamIndex: number, user: AddEventUser) {
    this.handleRemoveUser({ teamIndex, user });
  }

  handleAddUser(data?: { user?: AddEventUser; teamIndex?: number }) {
    if (!data || !data.user || data.teamIndex === undefined) {
      return;
    }

    this.teams[data.teamIndex].push(data.user);
    this.notAddedUserList = this.getOnlyNotAddedUserList();
  }

  handleRemoveUser(data?: { user?: AddEventUser; teamIndex?: number }) {
    if (!data || !data.user || data.teamIndex === undefined) {
      return;
    }

    this.teams[data.teamIndex] = this.teams[data.teamIndex].filter(
      (item) => item.id !== data?.user?.id,
    );
    this.notAddedUserList = this.getOnlyNotAddedUserList();
  }

  fetchUserList() {
    const organizationId = this.route.snapshot.params['organizationId'];

    this.organizationsService.getUsers(organizationId, 0, 1000).subscribe({
      next: (res: PagedResponse<UserDetailsDto>) => {
        this.userList = res.content;
        this.notAddedUserList = this.getOnlyNotAddedUserList();
      },
    });
  }

  getOnlyNotAddedUserList() {
    let notAddedList: UserDetailsDto[] = [];

    this.userList.forEach((user) => {
      let found: boolean = false;

      this.teams.forEach((team) => {
        if (team.findIndex((item) => item.id === user.id) !== -1) {
          found = true;
        }
      });

      if (!found) {
        notAddedList.push(user);
      }
    });

    return notAddedList;
  }

  openAddUserDialog(teamIndex: number) {
    this.addUserDialogRef = this.dialogService.open(AddUserDialogComponent, {
      data: {
        require3Characters: false,
        userList: this.notAddedUserList,
        teamIndex,
      },
      header: this.languageService.instant('event.addUser'),
      width: '25rem',
    });

    this.addUserDialogRef.onClose.subscribe((res) => {
      this.handleAddUser({ teamIndex: res?.teamIndex, user: res?.user });
    });
  }

  handleAddMatch() {
    const organizationId = this.route.snapshot.params['organizationId'];
    const eventId = this.route.snapshot.params['eventId'];

    this.addMatch.emit({
      match: {
        team1Ids: this.teams[0].map((i) => i.id),
        team2Ids: this.teams[1].map((i) => i.id),
      },
      eventId,
      type: EventType.PING_PONG,
      organizationId,
    });
  }

  protected readonly AddEventFormStep = AddEventFormStep;
  protected readonly Array = Array;
}
