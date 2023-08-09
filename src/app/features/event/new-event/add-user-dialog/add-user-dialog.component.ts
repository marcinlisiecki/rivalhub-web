import { Component, Input } from '@angular/core';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTeamUser } from '@interfaces/event/add-team-user';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent {
  @Input() userList: UserDetailsDto[] = [];
  userSearchQuery: string = '';

  getFilteredUserList(): UserDetailsDto[] {
    return this.userList.filter((user) =>
      user.name.toLowerCase().includes(this.userSearchQuery.toLowerCase()),
    );
  }

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
  ) {
    this.userList = dialogConfig.data['userList'];
  }

  handleAddUser(user: UserDetailsDto) {
    this.dialogRef.close({
      teamIndex: this.dialogConfig.data['teamIndex'],
      user,
    });
  }
}
