import { EventType } from '@interfaces/event/event-type';
import { Station } from '@interfaces/station/station';

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
