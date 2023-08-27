import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';
import { AddEventUser } from '@interfaces/event/add-event-user';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUserDialogComponent } from '@app/features/event/new-event/add-user-dialog/add-user-dialog.component';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { AuthService } from '@app/core/services/auth/auth.service';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-add-event-users',
  templateUrl: './add-event-users.component.html',
  styleUrls: ['./add-event-users.component.scss'],
})
export class AddEventUsersComponent implements OnInit {
  @Input() addedUsers: AddEventUser[] = [];
  @Input() userList: UserDetailsDto[] = [];
  @Input() isPublicEvent: boolean = false;

  @Output() handleAddUser: EventEmitter<AddEventUser> =
    new EventEmitter<AddEventUser>();
  @Output() handleRemoveUser: EventEmitter<AddEventUser> =
    new EventEmitter<AddEventUser>();
  @Output() setFormStep: EventEmitter<AddEventFormStep> =
    new EventEmitter<AddEventFormStep>();
  @Output() setPublicEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  loggedInUserId!: number | null;
  publicEvent!: boolean;
  addUserDialogRef?: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private authService: AuthService,
    private languageService: LanguageService,
  ) {
    this.loggedInUserId = authService.getUserId();
  }

  ngOnInit(): void {
    this.publicEvent = this.isPublicEvent;
  }

  removeUser(user: AddEventUser) {
    this.handleRemoveUser.emit(user);
  }

  openAddUserDialog() {
    this.addUserDialogRef = this.dialogService.open(AddUserDialogComponent, {
      data: {
        require3Characters: true,
        userList: this.userList.filter(
          (user) =>
            this.addedUsers.findIndex((item) => user.id === item.id) === -1,
        ),
      },
      header: this.languageService.instant('event.addUser'),
      width: '25rem',
    });

    this.addUserDialogRef.onClose.subscribe((user) => {
      this.handleAddUser.emit(user);
    });
  }

  protected readonly AddEventFormStep = AddEventFormStep;
  protected readonly Array = Array;
}
