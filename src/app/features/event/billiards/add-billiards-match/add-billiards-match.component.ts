import { Component } from '@angular/core';
import { WinType } from '@interfaces/event/games/billiards/billiards-win-type';

@Component({
  selector: 'app-add-billiards-match',
  templateUrl: './add-billiards-match.component.html',
  styleUrls: ['./add-billiards-match.component.scss'],
})
export class AddBilliardsMatchComponent {
  winnerOptions: any[] = [
    { name: 'Drużyna 1', value: 1 },
    { name: 'Remis ', value: 0 },
    { name: 'Drużyna 2', value: 2 },
  ];

  winTypes: any[] = [
    { name: 'Wszystkie kule wbite', value: WinType.ALL_IN },
    { name: 'Faul', value: WinType.FOUl_ON8 },
  ];
}
