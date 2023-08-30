import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DartsLeg } from '@app/core/interfaces/event/games/darts/dart-leg';

@Component({
  selector: 'app-view-darts-matches',
  templateUrl: './view-darts-matches.component.html',
  styleUrls: ['./view-darts-matches.component.scss'],
})
export class ViewDartsMatchesComponent {
  @Input({ required: true }) matches!: DartsLeg[];
  @Input() editable: boolean = false;

  @Output() approveMatch: EventEmitter<number> = new EventEmitter<number>();
}
