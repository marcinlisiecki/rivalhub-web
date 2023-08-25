import { Component, Input } from '@angular/core';
import { PullUpsMatch } from '@interfaces/event/games/pull-ups/pull-ups-match';

@Component({
  selector: 'app-view-pull-ups-matches',
  templateUrl: './view-pull-ups-matches.component.html',
  styleUrls: ['./view-pull-ups-matches.component.scss'],
})
export class ViewPullUpsMatchesComponent {
  @Input({ required: true }) matches!: PullUpsMatch[];
}
