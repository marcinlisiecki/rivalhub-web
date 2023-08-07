import { Component, Input } from '@angular/core';

import { EventDto } from '@interfaces/event/event-dto';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent {
  @Input({ required: true }) event!: EventDto;
}
