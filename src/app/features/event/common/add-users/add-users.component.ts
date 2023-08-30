import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddUserDialogComponent } from '@app/features/event/new-event/add-user-dialog/add-user-dialog.component';
import { AddEventUser } from '@interfaces/event/add-event-user';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '@app/core/services/auth/auth.service';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent {
  @Input() addedUsers: AddEventUser[] = [];
  @Input() userList: UserDetailsDto[] = [];

  @Output() handleAddUser: EventEmitter<AddEventUser> =
    new EventEmitter<AddEventUser>();
  @Output() handleRemoveUser: EventEmitter<AddEventUser> =
    new EventEmitter<AddEventUser>();

  loggedInUserId!: number | null;
  addUserDialogRef?: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private authService: AuthService,
    private languageService: LanguageService,
  ) {
    this.loggedInUserId = authService.getUserId();
  }

  removeUser(user: AddEventUser) {
    this.handleRemoveUser.emit(user);
  }

  openAddUserDialog() {
    this.addUserDialogRef = this.dialogService.open(AddUserDialogComponent, {
      data: {
        require3Characters: false,
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
}
