export enum EventType {
  PING_PONG = 'PING_PONG',
  BILLIARDS = 'BILLIARDS',
}

export interface AvailableEvent {
  type: EventType;
  icon: string;
}

export enum AddEventFormStep {
  CATEGORY,
  BASIC_INFO,
  DATE,
  RESERVATION,
}
