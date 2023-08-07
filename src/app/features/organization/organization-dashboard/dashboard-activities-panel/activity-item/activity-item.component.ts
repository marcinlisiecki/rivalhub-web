import { Component, Input } from '@angular/core';

import { EventDto } from '@interfaces/event/event-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import * as moment from 'moment';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent {
  @Input({ required: true }) reservation!: Reservation;
  protected readonly moment = moment;
}
