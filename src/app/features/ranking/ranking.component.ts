import { Component, OnInit } from '@angular/core';
import { RankingService } from '@app/core/services/ranking/ranking.service';
import { RankingDTO } from '@interfaces/ranking/ranking';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  organizationId!: string;
  category!: RankingDTO[];
  private rankSub!: Subscription;
  constructor(
    private rankingService: RankingService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.organizationId = <string>(
      this.route.snapshot.paramMap.get('organizationId')
    );
    this.rankSub = this.rankingService
      .getRankingDTO('BILLIARDS', this.organizationId)
      .subscribe((users) => {
        this.category = users;
      });
  }

  ngOnDestroy() {
    this.rankSub.unsubscribe();
  }
  categoryChanged(a: any) {
    this.rankSub.unsubscribe();
    this.rankSub = this.rankingService
      .getRankingDTO(a.type, this.organizationId)
      .subscribe((users) => {
        this.category = users;
      });
  }
}
