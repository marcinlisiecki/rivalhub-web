import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
//const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: '2023-08-07',
    extendedProps: {
      organisation: 'NCDC',
    },
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '2023-08-08' + 'T00:00:00',
    end: '2023-08-08' + 'T03:00:00',
    extendedProps: {
      organisation: 'NCDC',
    },
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: '2023-08-09' + 'T12:00:00',
    end: '2023-08-09' + 'T15:00:00',
    extendedProps: {
      organisation: 'NCDC',
    },
  },
];

export function createEventId() {
  return String(eventGuid++);
}

/**
Model eventu:{

  id: no id eventu,
  title: nie zgadniesz - tytuł,
  start/stop: format " RRRR-MM-DDTHH:MM:SS  " gdzie po T jest godzina, jeśli jest allDay: true, to ignoruje część po T
  extendedProps:{key:val} - tu można dawać własne rzeczy jak np. organizacja, typ itp.
  color: itp. https://fullcalendar.io/docs

}
*/
