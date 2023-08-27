import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PullUpsMatch } from '@interfaces/event/games/pull-ups/pull-ups-match';
import { PullUpsSeriesScores } from '@interfaces/event/games/pull-ups/pull-ups-series-scores';
import { PullUpsDisplayRanking } from '@interfaces/event/games/pull-ups/pull-ups-display-ranking';
import { DeleteSetEvent } from '@interfaces/event/delete-set-event';
import { PullUpsSeries } from '@interfaces/event/games/pull-ups/pull-ups-series';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LanguageService } from '@app/core/services/language/language.service';
import { TOAST_LIFETIME } from '@app/core/constants/messages';

@Component({
  selector: 'app-view-pull-ups-match',
  templateUrl: './view-pull-ups-match.component.html',
  styleUrls: ['./view-pull-ups-match.component.scss'],
})
export class ViewPullUpsMatchComponent implements OnInit {
  @Input({ required: true }) match!: PullUpsMatch;
  @Input() editable: boolean = false;

  @Output() handleAddSeries: EventEmitter<number> = new EventEmitter<number>();

  series: PullUpsSeriesScores[] = [];
  ranking: PullUpsDisplayRanking[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private languageService: LanguageService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.generateSeries();
    this.generateRanking();
  }

  deleteSeries(event: Event, series: PullUpsSeriesScores) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      acceptLabel: this.languageService.instant('common.yes'),
      rejectLabel: this.languageService.instant('common.no'),
      icon: 'pi pi-exclamation-triangle',
      message: this.languageService.instant('event.series.deleteQuestion'),
      accept: () => {
        this.match.scores = this.match.scores
          .filter((s) => s.seriesID !== series.seriesID)
          .map((s) => {
            if (s.seriesID > series.seriesID) {
              s.seriesID--;
            }

            return s;
          });

        this.series = [];
        this.generateSeries();

        this.messageService.add({
          severity: 'success',
          life: TOAST_LIFETIME,
          summary: this.languageService.instant(
            'event.series.deleteConfirmation',
          ),
        });
      },
      reject: () => {},
    });
  }

  generateRanking() {
    Object.keys(this.match.places).forEach((key) => {
      const name = this.match.userDetailsDtos.filter(
        (item) => item.id === parseInt(key),
      )[0].name;

      this.ranking.push({
        name,
        place: this.match.places[parseInt(key)] as unknown as number,
      });
    });

    this.ranking = this.ranking.sort((a, b) => a.place - b.place);
  }

  generateSeries() {
    let seriesIds: number[] = [];

    this.match.scores.forEach((score) => {
      if (!seriesIds.includes(score.seriesID)) {
        seriesIds.push(score.seriesID);
      }
    });

    seriesIds = seriesIds.sort();

    seriesIds.forEach((id) => {
      const seriesWithId = this.match.scores.filter(
        (item) => item.seriesID === id,
      );

      this.series.push({
        seriesID: id,
        scores: seriesWithId.map((item) => ({
          seriesID: item.seriesID,
          score: item.score,
          userName: this.match.userDetailsDtos.filter(
            (user) => user.id === item.userId,
          )[0].name,
        })),
      });
    });
  }
}
