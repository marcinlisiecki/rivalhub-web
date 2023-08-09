import { EventType } from '@interfaces/event/event-type';
import { MenuItem } from 'primeng/api';
import { AvailableEvent } from '@interfaces/event/available-event';

export const AVAILABLE_EVENTS: AvailableEvent[] = [
  {
    type: EventType.PING_PONG,
    icon: 'pi-image',
  },
  {
    type: EventType.BILLIARDS,
    icon: 'pi-image',
  },
];

export const ADD_EVENT_FORM_STEPS: MenuItem[] = [
  {
    label: 'Kategoria',
  },
  {
    label: 'Informacje',
  },
  {
    label: 'Data i czas',
  },
  {
    label: 'Rezerwacja',
  },
];
