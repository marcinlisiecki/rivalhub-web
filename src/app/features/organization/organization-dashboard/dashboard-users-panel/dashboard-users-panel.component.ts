import { Component, Input } from '@angular/core';
import { UserDto } from '@app/core/interfaces/UserDto';

@Component({
  selector: 'app-dashboard-users-panel',
  templateUrl: './dashboard-users-panel.component.html',
  styleUrls: ['./dashboard-users-panel.component.scss'],
})
export class DashboardUsersPanelComponent {
  @Input({ required: true })
  users!: UserDto[];
}
