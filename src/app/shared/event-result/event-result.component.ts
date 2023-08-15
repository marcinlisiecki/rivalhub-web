import { Component, Input } from '@angular/core';
import { EventResult } from '@app/core/interfaces/event/event-result';
import { PingPongResult } from '@app/core/interfaces/event/games/ping-pong/ping-pong-result';
import * as moment from 'moment';

@Component({
  selector: 'app-event-result',
  templateUrl: './event-result.component.html',
  styleUrls: ['./event-result.component.scss'],
})
export class EventResultComponent {
  @Input({ required: true }) result!: EventResult;
  tie: boolean = false;

  setWinner($event: number) {
    this.result.isWinner = $event === -1;
    this.tie = $event === 0;
  }
}
