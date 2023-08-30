import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PingPongMatch } from '@interfaces/event/games/ping-pong/ping-pong-match';

@Component({
  selector: 'app-view-table-football-matches',
  templateUrl: './view-table-football-matches.component.html',
  styleUrls: ['./view-table-football-matches.component.scss'],
})
export class ViewTableFootballMatchesComponent {
  @Input({ required: true }) matches!: PingPongMatch[];
  @Input() editable: boolean = false;

  @Output() handleAddSet: EventEmitter<number> = new EventEmitter<number>();
  @Output() approveMatch: EventEmitter<number> = new EventEmitter<number>();
}
