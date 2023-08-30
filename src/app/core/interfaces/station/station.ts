import { EventType } from '@interfaces/event/event-type';

export interface Station {
  id: number;
  name: string;
  type: EventType;
  active: boolean;
}
