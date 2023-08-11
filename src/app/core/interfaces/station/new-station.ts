import { EventType } from '@interfaces/event/event-type';

export interface NewStation {
  name: string;
  type: EventType;
  active: boolean;
}
