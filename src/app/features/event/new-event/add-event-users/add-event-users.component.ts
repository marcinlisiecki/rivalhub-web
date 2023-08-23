import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';
import { AddEventUser } from '@interfaces/event/add-event-user';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUserDialogComponent } from '@app/features/event/new-event/add-user-dialog/add-user-dialog.component';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-add-event-users',
  templateUrl: './add-event-users.component.html',
  styleUrls: ['./add-event-users.component.scss'],
})
export class AddEventUsersComponent {
  @Input() addedUsers: AddEventUser[] = [];
  @Input() userList: UserDetailsDto[] = [];

  @Output() handleAddUser: EventEmitter<AddEventUser> =
    new EventEmitter<AddEventUser>();
  @Output() handleRemoveUser: EventEmitter<AddEventUser> =
    new EventEmitter<AddEventUser>();
  @Output() setFormStep: EventEmitter<AddEventFormStep> =
    new EventEmitter<AddEventFormStep>();

  loggedInUserId!: number | null;

  addUserDialogRef?: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private authService: AuthService,
  ) {
    this.loggedInUserId = authService.getUserId();
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
      header: 'Dodaj użytkownika',
      width: '25rem',
    });

    this.addUserDialogRef.onClose.subscribe((user) => {
      this.handleAddUser.emit(user);
    });
  }

  protected readonly AddEventFormStep = AddEventFormStep;
  protected readonly Array = Array;
}
