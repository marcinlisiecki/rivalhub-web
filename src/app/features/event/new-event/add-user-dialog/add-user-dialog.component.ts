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
  @Input() require3Characters: boolean = false;

  filteredUserList: UserDetailsDto[] = [];
  userSearchQuery: string = '';

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
  ) {
    this.userList = dialogConfig.data['userList'];
    this.require3Characters = dialogConfig.data['require3Characters'] || false;
    this.filteredUserList = this.userList;
  }

  setFilteredUserList() {
    this.filteredUserList = this.userList.filter(
      (user) =>
        user.name.toLowerCase().includes(this.userSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.userSearchQuery.toLowerCase()),
    );
  }

  onSearchChange(value: string) {
    this.userSearchQuery = value;
    this.setFilteredUserList();
  }

  handleAddUser(user: UserDetailsDto) {
    if (this.dialogConfig.data['teamIndex'] !== undefined) {
      this.dialogRef.close({
        teamIndex: this.dialogConfig.data['teamIndex'],
        user,
      });
    } else {
      this.dialogRef.close(user);
    }
  }
}
