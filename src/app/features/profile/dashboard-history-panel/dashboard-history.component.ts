import { Component, Input } from '@angular/core';
import { EventResult } from '@app/core/interfaces/event/event-result';

import { PingPongResult } from '@app/core/interfaces/event/games/ping-pong/ping-pong-result';

@Component({
  selector: 'app-dashboard-history',
  templateUrl: './dashboard-history.component.html',
  styleUrls: ['./dashboard-history.component.scss'],
})
export class DashboardHistoryComponent {
  @Input({ required: true })
  games!: EventResult[];
}
