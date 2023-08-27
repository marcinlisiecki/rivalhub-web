import { Component, Input, OnInit } from '@angular/core';
import { DartsLeg } from '@app/core/interfaces/event/games/darts/darts-leg';
import { MOCKLEGS } from './mock-legs';

@Component({
  selector: 'app-view-darts-matches',
  templateUrl: './view-darts-matches.component.html',
  styleUrls: ['./view-darts-matches.component.scss'],
})
export class ViewDartsMatchesComponent implements OnInit {
  @Input({ required: true }) matches: DartsLeg[] = [];
  @Input() editable: boolean = false;

  ngOnInit(): void {}
}
