import { AvailableEvent, EventType } from '../interfaces/event';
import { MenuItem } from 'primeng/api';

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
