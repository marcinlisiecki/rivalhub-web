import { Component, Input } from '@angular/core';
import { EventDto } from '@interfaces/EventDto';

@Component({
  selector: 'app-dashboard-activities-panel',
  templateUrl: './dashboard-activities-panel.component.html',
  styleUrls: ['./dashboard-activities-panel.component.scss'],
})
export class DashboardActivitiesPanelComponent {
  @Input({ required: true }) events!: EventDto[];
}
