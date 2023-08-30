import { EventType } from '@interfaces/event/event-type';

export const categoryTypeToLabel = (eventType: EventType | string): string => {
  return (
    {
      [EventType.PING_PONG]: 'eventType.pingPong',
      [EventType.BILLIARDS]: 'eventType.billiards',
      [EventType.PULL_UPS]: 'eventType.pullUps',
      [EventType.DARTS]: 'eventType.darts',
      [EventType.TABLE_FOOTBALL]: 'eventType.tableFootball',
      [EventType.RUNNING]: 'eventType.running',
    }[eventType] || ''
  );
};

export const labelToCategoryType = (label: string): EventType => {
  const eventTypeMap: Record<string, EventType> = {
    'Ping Pong': EventType.PING_PONG,
    Bilard: EventType.BILLIARDS,
  };
  return eventTypeMap[label];
};
