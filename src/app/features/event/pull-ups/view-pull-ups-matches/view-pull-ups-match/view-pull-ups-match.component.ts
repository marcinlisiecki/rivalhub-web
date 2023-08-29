import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PullUpsMatch } from '@interfaces/event/games/pull-ups/pull-ups-match';
import { PullUpsSeriesScores } from '@interfaces/event/games/pull-ups/pull-ups-series-scores';
import { PullUpsDisplayRanking } from '@interfaces/event/games/pull-ups/pull-ups-display-ranking';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TOAST_LIFETIME } from '@app/core/constants/messages';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@app/core/utils/apiErrors';
import { ErrorsService } from '@app/core/services/errors/errors.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-view-pull-ups-match',
  templateUrl: './view-pull-ups-match.component.html',
  styleUrls: ['./view-pull-ups-match.component.scss'],
})
export class ViewPullUpsMatchComponent implements OnInit {
  @Input({ required: true }) match!: PullUpsMatch;
  @Input() editable: boolean = false;

  @Output() handleAddSeries: EventEmitter<number> = new EventEmitter<number>();
  @Output() approveMatch: EventEmitter<number> = new EventEmitter<number>();

  loggedInUserId!: number;

  series: PullUpsSeriesScores[] = [];
  ranking: PullUpsDisplayRanking[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    public languageService: LanguageService,
    private messageService: MessageService,
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private errorsService: ErrorsService,
    private authService: AuthService,
  ) {
    this.loggedInUserId = authService.getUserId() as number;
  }

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

        const organizationId = this.route.snapshot.params['organizationId'];
        const eventId = this.route.snapshot.params['eventId'];

        this.eventsService
          .removePullUpsSeries(
            organizationId,
            eventId,
            this.match.id,
            series.seriesID,
          )
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                life: TOAST_LIFETIME,
                summary: this.languageService.instant(
                  'event.series.deleteConfirmation',
                ),
              });
            },
            error: (err: HttpErrorResponse) => {
              this.errorsService.createErrorMessage(extractMessage(err));
            },
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
