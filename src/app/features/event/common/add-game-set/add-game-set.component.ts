import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-game-set',
  templateUrl: './add-game-set.component.html',
  styleUrls: ['./add-game-set.component.scss'],
})
export class AddGameSetComponent {
  team1Score: number = 0;
  team2Score: number = 0;
  setNr!: number;
  matchId!: number;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
  ) {
    this.setNr = dialogConfig.data['setNr'];
    this.matchId = dialogConfig.data['matchId'];
  }

  onSubmit() {
    this.dialogRef.close({
      team1Score: this.team1Score,
      team2Score: this.team2Score,
      setNr: this.setNr,
      matchId: this.matchId,
    });
  }
}
