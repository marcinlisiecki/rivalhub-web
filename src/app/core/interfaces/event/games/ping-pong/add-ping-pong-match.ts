import { EventType } from '@interfaces/event/event-type';
import { NewPingPongMatch } from '@interfaces/event/games/ping-pong/new-ping-pong-match';

export interface AddPingPongMatch {
  organizationId: number;
  eventId: number;
  type: EventType;
  match: NewPingPongMatch;
}
