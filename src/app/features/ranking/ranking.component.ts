import { Component, OnInit } from '@angular/core';
import { RankingService } from '@app/core/services/ranking/ranking.service';
import { RankingDTO } from '@interfaces/ranking/ranking';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  category!: RankingDTO[];
  constructor(private rankingService: RankingService) {}

  ngOnInit() {
    this.category = this.rankingService.getRankingDTO('PING_PONG');
  }
  categoryChanged(a: any) {
    this.category = this.rankingService.getRankingDTO(a.type);
  }
}
