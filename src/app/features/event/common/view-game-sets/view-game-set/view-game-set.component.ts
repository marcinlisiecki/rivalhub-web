import { Component, Input } from '@angular/core';
import { GameSet } from '@interfaces/event/games/game-set';

@Component({
  selector: 'app-view-game-set',
  templateUrl: './view-game-set.component.html',
  styleUrls: ['./view-game-set.component.scss'],
})
export class ViewGameSetComponent {
  @Input({ required: true }) gameSet!: GameSet;
}
