import { Component, Input } from '@angular/core';
import { GameSet } from '@interfaces/event/games/game-set';

@Component({
  selector: 'app-view-game-sets',
  templateUrl: './view-game-sets.component.html',
  styleUrls: ['./view-game-sets.component.scss'],
})
export class ViewGameSetsComponent {
  @Input({ required: true }) gameSets!: GameSet[];
}
