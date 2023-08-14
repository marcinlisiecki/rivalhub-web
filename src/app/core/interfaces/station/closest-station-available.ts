import { Station } from '@interfaces/station/station';
import { EventType } from '@interfaces/event/event-type';

export interface ClosestStationAvailable {
  type: EventType;
  firstAvailable: Date;
  stations: Station[];
  formatedFirstAvailable?: string;
}
