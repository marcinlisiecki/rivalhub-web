import { Station } from '../core/interfaces/Station';
import { EventType } from '../core/interfaces/event';

export const STATIONS: Station[] = [
  {
    id: 1,
    name: 'Stół nr 1',
    type: EventType.PING_PONG,
  },
  {
    id: 2,
    name: 'Stół nr 2',
    type: EventType.PING_PONG,
  },
  {
    id: 3,
    name: 'Stół nr 1',
    type: EventType.BILLIARDS,
  },
];
