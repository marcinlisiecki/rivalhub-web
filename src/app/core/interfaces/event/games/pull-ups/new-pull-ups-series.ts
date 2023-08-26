import { AddPullUpsUserResults } from '@interfaces/event/games/pull-ups/add-pull-ups-user-results';

export interface NewPullUpsSeries {
  matchId: number;
  series: AddPullUpsUserResults[];
}
