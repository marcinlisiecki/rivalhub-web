import { Component, Input } from '@angular/core';
import { PingPongResult } from '@app/core/interfaces/event/games/ping-pong/ping-pong-result';
import * as moment from 'moment';

@Component({
  selector: 'app-ping-ping-result',
  templateUrl: './ping-ping-result.component.html',
  styleUrls: ['./ping-ping-result.component.scss'],
})
export class PingPingResultComponent {
  @Input({ required: true }) result!: PingPongResult;

  formatDate(date: Date): string {
    return moment(date).format('DD-MM-yyyy HH:mm');
  }
}
