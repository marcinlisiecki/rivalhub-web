import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { AddPullUpsUserResults } from '@interfaces/event/games/pull-ups/add-pull-ups-user-results';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-add-pull-ups-series',
  templateUrl: './add-pull-ups-series.component.html',
  styleUrls: ['./add-pull-ups-series.component.scss'],
})
export class AddPullUpsSeriesComponent {
  seriesID!: number;
  matchId!: number;
  users!: UserDetailsDto[];
  usersResults: AddPullUpsUserResults[] = [];
  errorMessage?: string;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private languageService: LanguageService,
  ) {
    this.seriesID = dialogConfig.data['seriesID'];
    this.matchId = dialogConfig.data['matchId'];
    this.users = dialogConfig.data['users'];

    this.users.forEach((user) => {
      this.usersResults.push({
        name: user.name,
        result: 0,
        userId: user.id,
        seriesID: this.seriesID,
      });
    });
  }

  onSubmit() {
    let isValid = true;

    this.usersResults.forEach((result) => {
      if (result.result < 0) {
        this.errorMessage = this.languageService.instant(
          'event.series.validation.requirePositiveNumber',
        );
        isValid = false;
      }

      if (result.result > 10_000) {
        this.errorMessage = this.languageService.instant(
          'event.series.validation.tooBig',
        );
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    this.dialogRef.close({
      matchId: this.matchId,
      series: this.usersResults,
    });
  }
}
