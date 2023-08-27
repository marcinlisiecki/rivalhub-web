import { Component, Input, OnInit } from '@angular/core';
import { DartsLeg } from '@app/core/interfaces/event/games/darts/darts-leg';

@Component({
  selector: 'app-view-darts-match',
  templateUrl: './view-darts-match.component.html',
  styleUrls: ['./view-darts-match.component.scss'],
})
export class ViewDartsMatchComponent implements OnInit {
  @Input({ required: true }) match!: DartsLeg;

  ngOnInit(): void {}

  getHits(bounceOuts: number): number[] {
    return new Array(3 - bounceOuts);
  }
  getMisses(bounceOuts: number): number[] {
    return new Array(bounceOuts);
  }
}
