import { EventType } from '@interfaces/event/event-type';
import { NewTableFootballMatch } from '@interfaces/event/games/table-football/new-table-football-match';

export interface AddTableFootballMatch {
  organizationId: number;
  eventId: number;
  type: EventType;
  match: NewTableFootballMatch;
}
