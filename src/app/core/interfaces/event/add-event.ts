export interface AddEvent {
  stationList: number[];
  startTime: Date;
  endTime: Date;
  host: number;
  isEventPublic: boolean;
  participants: number[];
  description: string;
  name: string;
}
