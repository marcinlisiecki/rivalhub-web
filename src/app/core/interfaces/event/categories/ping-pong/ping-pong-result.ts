import { EventResult } from '../event-result';
import { GameSet } from '../game-set';

export interface PingPongResult extends EventResult {
  team1SetsScore: GameSet[];
  team2SetsScore: GameSet[];
}
