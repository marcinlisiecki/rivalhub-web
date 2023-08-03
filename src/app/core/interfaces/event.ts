export enum EventType {
  PING_PONG = 'PING_PONG',
  BILLIARDS = 'BILLIARDS',
}

export interface AvailableEvent {
  type: EventType;
  label: string;
  icon: string;
}

export const AvailableEvents: AvailableEvent[] = [
  {
    type: EventType.PING_PONG,
    label: 'Ping Pong',
    icon: 'pi-image',
  },
  {
    type: EventType.BILLIARDS,
    label: 'Bilard',
    icon: 'pi-image',
  },
];
