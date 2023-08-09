import { Component, Input } from '@angular/core';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent {
  @Input() userList: UserDetailsDto[] = [];
  filteredUserList: UserDetailsDto[] = [];
  userSearchQuery: string = '';

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
  ) {
    this.userList = dialogConfig.data['userList'];
    this.filteredUserList = this.userList;
  }

  setFilteredUserList() {
    this.filteredUserList = this.userList.filter((user) =>
      user.name.toLowerCase().includes(this.userSearchQuery.toLowerCase()),
    );
  }

  onSearchChange(value: string) {
    this.userSearchQuery = value;
    this.setFilteredUserList();
  }

  handleAddUser(user: UserDetailsDto) {
    this.dialogRef.close({
      teamIndex: this.dialogConfig.data['teamIndex'],
      user,
    });
  }
}
