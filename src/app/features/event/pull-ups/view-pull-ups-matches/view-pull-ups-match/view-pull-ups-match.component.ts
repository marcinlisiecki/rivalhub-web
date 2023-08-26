import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PullUpsMatch } from '@interfaces/event/games/pull-ups/pull-ups-match';
import { PullUpsSeriesScores } from '@interfaces/event/games/pull-ups/pull-ups-series-scores';
import { PullUpsDisplayRanking } from '@interfaces/event/games/pull-ups/pull-ups-display-ranking';

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

  constructor() {}

  ngOnInit(): void {
    this.generateSeries();
    this.generateRanking();
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
