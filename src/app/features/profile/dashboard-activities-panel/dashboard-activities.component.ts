import { Component, Input } from '@angular/core';

import { Reservation } from '@interfaces/reservation/reservation';

@Component({
  selector: 'app-dashboard-activities',
  templateUrl: './dashboard-activities.component.html',
  styleUrls: ['./dashboard-activities.component.scss'],
})
export class DashboardActivitiesComponent {
  @Input({ required: true }) reservations!: Reservation[];
}
