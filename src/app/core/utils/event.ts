import { EventType } from '../interfaces/event';

export const categoryTypeToLabel = (eventType: EventType | string): string => {
  return {
    [EventType.PING_PONG]: 'Ping Pong',
    [EventType.BILLIARDS]: 'Bilard',
  }[eventType] || "";
};

export const labelToCategoryType = (label: string): EventType => {
  const categoryLabelsToTypes: { [label: string]: EventType } = {
    'PING_PONG': EventType.PING_PONG,
    'BILLIARDS': EventType.BILLIARDS,
  };

  return categoryLabelsToTypes[label];
};
