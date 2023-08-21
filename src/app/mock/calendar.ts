import { CalendarEvent } from '@interfaces/calendar/calendar-event';

let eventGuid = 0;
//const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: createEventId(),
    title: 'NCDC Wydarzenie',
    startStr: '2023-08-07',
    start: new Date('2023-08-07'),
    endStr: '',
    type: 'event',
    typeId: '1',
    allDay: true,
    organisationId: '2',
    organisationName: 'NCDC',
    color: 'red',
    textColor: 'red',
    extendedProps: {
      organisationId: '2',
      organisationName: 'NCDC',
      type: 'event',
      backgroundColor: 'blue',
    },
  },
  {
    id: createEventId(),
    title: 'NCDC Wydarzenie 2',
    type: 'event',
    typeId: '1',
    startStr: '2023-08-08' + 'T00:00:00',
    start: new Date('2023-08-08T00:00:00'),
    endStr: '2023-08-08' + 'T03:00:00',
    end: new Date('2023-08-08' + 'T03:00:00'),
    allDay: true,
    organisationId: '2',
    organisationName: 'NCDC',
    color: 'red',
    textColor: 'yellow',
    extendedProps: {
      organisationId: '2',
      organisationName: 'NCDC',
      type: 'event',
    },
  },
  {
    id: createEventId(),
    title: 'NCDC Rezerwacja 1',
    type: 'reservation',
    typeId: '2',
    startStr: '2023-08-09' + 'T12:00:00',
    start: new Date('2023-08-09' + 'T12:00:00'),
    endStr: '2023-08-09' + 'T12:00:00',
    end: new Date('2023-08-09' + 'T12:00:00'),
    allDay: false,
    constraint: 'any',
    organisationId: '2',
    organisationName: 'NCDC',
    color: 'red',
    backgroundColor: 'blue',
    borderColor: '#4a0713',
    extendedProps: {
      organisationId: '2',
      organisationName: 'NCDC',
      type: 'reservation',
    },
  },
  {
    id: createEventId(),
    title: 'NCDC2 Rezerwacja 1',
    type: 'reservation',
    typeId: '2',
    startStr: '2023-08-09' + 'T16:00:00',
    start: new Date('2023-08-09' + 'T16:00:00'),
    endStr: '2023-08-09' + 'T18:00:00',
    end: new Date('2023-08-09' + 'T18:00:00'),
    allDay: false,
    constraint: 'any',
    organisationId: '1',
    organisationName: 'NCDC2',
    color: 'red',
    backgroundColor: '#367790',
    extendedProps: {
      organisationId: '1',
      organisationName: 'NCDC2',
      type: 'reservation',
    },
  },
  {
    id: createEventId(),
    title: 'NCDC2 Rezerwacja 1',
    type: 'reservation',
    typeId: '2',
    startStr: '2023-08-09' + 'T16:00:00',
    start: new Date('2023-08-09' + 'T16:00:00'),
    endStr: '2023-08-09' + 'T18:00:00',
    end: new Date('2023-08-09' + 'T18:00:00'),
    allDay: false,
    constraint: 'any',
    organisationId: '1',
    organisationName: 'NCDC2',
    color: 'red',
    backgroundColor: '#367790',
    borderColor: '#367790',
    extendedProps: {
      organisationId: '1',
      organisationName: 'NCDC2',
      type: 'reservation',
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
