import { Component, Input } from '@angular/core';

import { EventDto } from '@interfaces/event/event-dto';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  @Input({ required: true }) event!: EventDto;
  protected readonly moment = moment;
}
