import { Component, Input } from '@angular/core';

import { Reservation } from '@interfaces/reservation/reservation';

@Component({
  selector: 'app-dashboard-activities-panel',
  templateUrl: './dashboard-activities-panel.component.html',
  styleUrls: ['./dashboard-activities-panel.component.scss'],
})
export class DashboardActivitiesPanelComponent {
  @Input({ required: true }) reservations!: Reservation[];
}
