import { EventResult } from '../../event-result';
import { GameSet } from '../game-set';

export interface PingPongResult extends EventResult {
  sets?: GameSet[];
}
