import { Component, Input } from '@angular/core';

import { UserDetailsDto } from '@interfaces/user/user-details-dto';

@Component({
  selector: 'app-dashboard-users-panel',
  templateUrl: './dashboard-users-panel.component.html',
  styleUrls: ['./dashboard-users-panel.component.scss'],
})
export class DashboardUsersPanelComponent {
  @Input({ required: true })
  users!: UserDetailsDto[];
}
