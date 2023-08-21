export interface AddEvent {
  stationList: number[];
  startTime: Date;
  endTime: Date;
  host: number;
  participants: number[];
  description: string;
  name: string;
}
