import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LanguageService } from '@app/core/services/language/language.service';

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
  errorMessage?: string;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private languageService: LanguageService,
  ) {
    this.setNr = dialogConfig.data['setNr'];
    this.matchId = dialogConfig.data['matchId'];
  }

  onSubmit() {
    if (this.team1Score < 0 || this.team2Score < 0) {
      this.errorMessage = this.languageService.instant(
        'event.sets.validation.requirePositiveNumber',
      );
      return;
    }

    if (this.team1Score > 10_000 || this.team2Score > 10_000) {
      this.errorMessage = this.languageService.instant(
        'event.sets.validation.tooBig',
      );
      return;
    }

    this.dialogRef.close({
      team1Score: this.team1Score,
      team2Score: this.team2Score,
      setNr: this.setNr,
      matchId: this.matchId,
    });
  }
}
