import { Organization } from '@interfaces/organization/organization';
import { EventType } from '@interfaces/event/event-type';

export interface EventDto {
  eventId: number;
  stationList: number[];
  startTime: Date;
  endTime: Date;
  host: number;
  participants: number[];
  organization: Organization;
  eventType: EventType;
  name: string;
  description: string;
  eventPublic: boolean;
  status: string;
}
