import { Component, Input } from '@angular/core';
import { PingPongResult } from '@app/core/interfaces/event/games/ping-pong/ping-pong-result';

@Component({
  selector: 'app-event-result',
  templateUrl: './event-result.component.html',
  styleUrls: ['./event-result.component.scss'],
})
export class EventResultComponent {
  @Input({ required: true }) game!: PingPongResult;
}
