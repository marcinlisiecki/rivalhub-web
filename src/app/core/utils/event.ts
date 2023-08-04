import { EventType } from '../interfaces/event';

export const categoryTypeToLabel = (eventType: EventType): string => {
  return {
    [EventType.PING_PONG]: 'Ping Pong',
    [EventType.BILLIARDS]: 'Bilard',
  }[eventType];
};
