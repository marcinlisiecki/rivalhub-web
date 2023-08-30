import { EventType } from '../interfaces/event/event-type';
import { StationOption } from '../interfaces/station/station-option';

export const STATION_OPTIONS: StationOption[] = [
  {
    label: 'eventType.billiards',
    value: EventType.BILLIARDS,
  },
  {
    label: 'eventType.darts',
    value: EventType.DARTS,
  },
  {
    label: 'eventType.pingPong',
    value: EventType.PING_PONG,
  },
  {
    label: 'eventType.pullUps',
    value: EventType.PULL_UPS,
  },
  {
    label: 'eventType.tableFootball',
    value: EventType.TABLE_FOOTBALL,
  },
];
