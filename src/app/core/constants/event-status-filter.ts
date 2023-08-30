import { EventStatusFilter } from '@interfaces/event/filter/event-status-filter';

export const EVENT_STATUS_FILTER: EventStatusFilter[] = [
  {
    name: 'Wszystkie',
    status: 'ALL',
  },
  {
    name: 'Aktywne i przyszłe',
    status: 'NotHistorical',
  },
  {
    name: 'Przeszłe',
    status: 'Historical',
  },
];
