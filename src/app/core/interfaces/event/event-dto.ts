export interface EventDto {
  id: number;
  name: string;
  place: string;
  startTime: Date;
  endTime: Date;
  participantIds: number[];
}
