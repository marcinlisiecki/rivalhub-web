export interface EventDto {
  id: number;
  name: string;
  place: string;
  date: Date;
  beginEndTime: string;
  participantIds: number[];
}
