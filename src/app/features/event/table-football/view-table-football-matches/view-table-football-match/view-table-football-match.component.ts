import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PingPongMatch } from '@interfaces/event/games/ping-pong/ping-pong-match';

@Component({
  selector: 'app-view-table-football-match',
  templateUrl: './view-table-football-match.component.html',
  styleUrls: ['./view-table-football-match.component.scss'],
})
export class ViewTableFootballMatchComponent {
  @Input({ required: true }) match!: PingPongMatch;
  @Input() editable: boolean = false;

  @Output() handleAddSet: EventEmitter<number> = new EventEmitter<number>();
}
