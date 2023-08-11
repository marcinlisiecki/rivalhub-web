import { EventType } from '@interfaces/event/event-type';

export const categoryTypeToLabel = (eventType: EventType | string): string => {
  return (
    {
      [EventType.PING_PONG]: 'Ping Pong',
      [EventType.BILLIARDS]: 'Bilard',
      [EventType.PULL_UPS]: 'Podciągniecia',
      [EventType.DARTS]: 'Rzutki',
      [EventType.TABLE_FOOTBALL]: 'Piłkarzyki',
    }[eventType] || ''
  );
};
