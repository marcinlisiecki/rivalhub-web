import { Station } from '@interfaces/station/station';

export interface Reservation {
  id: number;
  stationList: Station[];
  startTime: Date;
  endTime: Date;
}
