import { Component, Input } from '@angular/core';

import { Reservation } from '@interfaces/reservation/reservation';
import {EVENTS, RESERVATIONS} from "@app/mock/stations";
import {EventDto} from "@interfaces/event/event-dto";

@Component({
  selector: 'app-dashboard-history',
  templateUrl: './dashboard-history.component.html',
  styleUrls: ['./dashboard-history.component.scss'],
})
export class DashboardHistoryComponent {
  // @Input({ required: true })
  events: EventDto[] = EVENTS;
}
