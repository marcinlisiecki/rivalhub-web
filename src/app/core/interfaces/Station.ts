import { EventType } from './event';

export interface Station {
  id: number;
  name: string;
  type: EventType;
}
