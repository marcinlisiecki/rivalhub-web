import {EventType} from '@interfaces/event/event-type';

export const categoryTypeToLabel = (eventType: EventType | string): string => {
  return (
    {
      [EventType.PING_PONG]: 'Ping Pong',
      [EventType.BILLIARDS]: 'Bilard',
    }[eventType] || ''
  );
};

export const labelToCategoryType = (label: string): EventType=> {
 const eventTypeMap: Record<string, EventType> = {
   'Ping Pong': EventType.PING_PONG,
   'Bilard': EventType.BILLIARDS
 }
 return eventTypeMap[label]
}
