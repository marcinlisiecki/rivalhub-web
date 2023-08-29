import { GameSet } from '@interfaces/event/game-set';

export interface DeleteSetEvent {
  event: Event;
  gameSet: GameSet;
}
