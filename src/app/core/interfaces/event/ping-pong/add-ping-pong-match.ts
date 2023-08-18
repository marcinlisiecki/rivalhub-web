import { NewPingPongMatch } from '@interfaces/event/ping-pong/new-ping-pong-match';
import { EventType } from '@interfaces/event/event-type';

export interface AddPingPongMatch {
  organizationId: number;
  eventId: number;
  type: EventType;
  match: NewPingPongMatch;
}
