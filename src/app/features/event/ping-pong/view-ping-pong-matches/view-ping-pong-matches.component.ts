import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PingPongMatch } from '@interfaces/event/games/ping-pong/ping-pong-match';

@Component({
  selector: 'app-view-ping-pong-matches',
  templateUrl: './view-ping-pong-matches.component.html',
  styleUrls: ['./view-ping-pong-matches.component.scss'],
})
export class ViewPingPongMatchesComponent {
  @Input({ required: true }) matches!: PingPongMatch[];
  @Input() editable: boolean = false;

  @Output() handleAddSet: EventEmitter<number> = new EventEmitter<number>();
}
