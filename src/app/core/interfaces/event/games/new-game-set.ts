import { GameSet } from '@interfaces/event/game-set';

export interface NewGameSet extends GameSet {
  matchId: number;
}
