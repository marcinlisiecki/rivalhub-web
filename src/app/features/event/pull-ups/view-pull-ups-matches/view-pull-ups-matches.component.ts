import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PullUpsMatch } from '@interfaces/event/games/pull-ups/pull-ups-match';

@Component({
  selector: 'app-view-pull-ups-matches',
  templateUrl: './view-pull-ups-matches.component.html',
  styleUrls: ['./view-pull-ups-matches.component.scss'],
})
export class ViewPullUpsMatchesComponent {
  @Input({ required: true }) matches: PullUpsMatch[] = [];
  @Input() editable: boolean = false;

  @Output() handleAddSeries: EventEmitter<number> = new EventEmitter<number>();
  @Output() approveMatch: EventEmitter<number> = new EventEmitter<number>();
}
