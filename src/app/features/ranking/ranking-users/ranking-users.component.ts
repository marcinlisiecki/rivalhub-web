import { Component, Input } from '@angular/core';
import { RankingDTO } from '@interfaces/ranking/ranking';
import { RANKING_PING_PONG } from '@app/mock/ranking';

@Component({
  selector: 'app-ranking-users',
  templateUrl: './ranking-users.component.html',
  styleUrls: ['./ranking-users.component.scss'],
})
export class RankingUsersComponent {
  @Input() users!: RankingDTO[];
  //users = RANKING_PING_PONG;
}
