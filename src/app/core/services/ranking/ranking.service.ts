import { Injectable } from '@angular/core';
import { EventType } from '@interfaces/event/event-type';
import {
  RANKING_BILARDS,
  RANKING_DARTS,
  RANKING_PING_PONG,
  RANKING_PULL_UPS,
  RANKING_RUNNING,
  RANKING_TABLE_FOOTBALL,
} from '@app/mock/ranking';
import { RankingDTO } from '@interfaces/ranking/ranking';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor() {}

  types: any = {
    PING_PONG: RANKING_PING_PONG,
    BILLIARDS: RANKING_BILARDS,
    TABLE_FOOTBALL: RANKING_TABLE_FOOTBALL,
    DARTS: RANKING_DARTS,
    PULL_UPS: RANKING_PULL_UPS,
    RUNNING: RANKING_RUNNING,
  };

  getRankingDTO(type: string): RankingDTO[] {
    return this.types[type];
  }
}
