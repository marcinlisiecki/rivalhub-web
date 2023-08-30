import { EventStatus } from '@interfaces/event/event-status';

export interface EventStatusFilter {
  name: string;
  status: EventStatus | 'ALL' | 'NotHistorical';
}
