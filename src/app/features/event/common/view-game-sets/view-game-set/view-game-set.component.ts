import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameSet } from '@interfaces/event/games/game-set';
import { DeleteSetEvent } from '@interfaces/event/delete-set-event';

@Component({
  selector: 'app-view-game-set',
  templateUrl: './view-game-set.component.html',
  styleUrls: ['./view-game-set.component.scss'],
})
export class ViewGameSetComponent {
  @Input({ required: true }) gameSet!: GameSet;
  @Input() editable: boolean = false;

  @Output() deleteSet: EventEmitter<DeleteSetEvent> =
    new EventEmitter<DeleteSetEvent>();

  onDelete(event: Event) {
    this.deleteSet.emit({ gameSet: this.gameSet, event });
  }
}
