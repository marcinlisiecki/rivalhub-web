import { EventType } from '@interfaces/event/event-type';

export interface EventCategoryFilter {
  name: string;
  value: EventType | 'ALL';
}
