import { Component } from '@angular/core';
import { WinType } from '@interfaces/event/games/billiards/billiards-win-type';
import { NewBilliardsMatchDialog } from '@interfaces/event/games/billiards/new-billiards-match-dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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

  winType!: WinType;
  team1Bills: number = 0;
  team2Bills: number = 0;
  winner: number | null = null;

  validationError: string | null = null;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
  ) {}

  onSubmit() {
    this.validationError = '';

    if (this.winner === null) {
      this.validationError = 'Podaj zwycięzców';
      return;
    }

    if (this.winner !== 0 && !this.winType) {
      this.validationError = 'Podaj typ wygranej';
      return;
    }

    const newMatch: NewBilliardsMatchDialog = {
      winType: this.winType,
      howManyBillsLeftTeam1: this.team1Bills,
      howManyBillsLeftTeam2: this.team2Bills,
      team1Won: this.winner === 1,
      team2Won: this.winner === 2,
    };

    this.dialogRef.close(newMatch);
  }

  protected readonly WinType = WinType;
}
