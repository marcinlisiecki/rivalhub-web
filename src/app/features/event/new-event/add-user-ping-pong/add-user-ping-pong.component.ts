import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';
import { AddEventUser } from '@interfaces/event/add-event-user';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUserDialogComponent } from '@app/features/event/new-event/add-user-dialog/add-user-dialog.component';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { AddTeamUser } from '@interfaces/event/add-team-user';

@Component({
  selector: 'app-add-user-ping-pong',
  templateUrl: './add-user-ping-pong.component.html',
  styleUrls: ['./add-user-ping-pong.component.scss'],
})
export class AddUserPingPongComponent {
  @Input() teams: AddEventUser[][] = [];
  @Input() userList: UserDetailsDto[] = [];

  @Output() handleAddUser: EventEmitter<AddTeamUser> =
    new EventEmitter<AddTeamUser>();
  @Output() setFormStep: EventEmitter<AddEventFormStep> =
    new EventEmitter<AddEventFormStep>();

  addUserDialogRef?: DynamicDialogRef;

  constructor(private dialogService: DialogService) {}

  openAddUserDialog(teamIndex: number) {
    this.addUserDialogRef = this.dialogService.open(AddUserDialogComponent, {
      data: {
        userList: this.userList,
        teamIndex,
      },
      header: 'Dodaj użytkownika',
      width: '25rem',
    });

    this.addUserDialogRef.onClose.subscribe((res) => {
      this.handleAddUser.emit({ teamIndex: res?.teamIndex, user: res?.user });
    });
  }

  protected readonly AddEventFormStep = AddEventFormStep;
  protected readonly Array = Array;
}
