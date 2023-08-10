import { EventType } from '@interfaces/event/event-type';

export interface EditStation {
  id: number;
  name: string;
  type: EventType;
  active: boolean;
}
