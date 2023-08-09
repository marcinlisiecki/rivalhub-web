import { Component, Input } from '@angular/core';

import { EventDto } from '@interfaces/event/event-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import * as moment from 'moment';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
  @Input({ required: true }) reservation!: Reservation;
  protected readonly moment = moment;
}
