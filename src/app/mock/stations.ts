import { EventType } from '@interfaces/event/event-type';
import { Station } from '@interfaces/station/station';
import {Reservation} from "@interfaces/reservation/reservation";
import {EventDto} from "@interfaces/event/event-dto";

export const STATIONS: Station[] = [
  {
    id: 1,
    name: 'Stół nr 1',
    type: EventType.PING_PONG,
  },
  {
    id: 2,
    name: 'Stół nr 2',
    type: EventType.PING_PONG,
  },
  {
    id: 3,
    name: 'Stół nr 1',
    type: EventType.BILLIARDS,
  },
];


export const RESERVATIONS: Reservation[]= [
  {
    id: 1,
    stationList: STATIONS,
    startTime: new Date("2023-09-11T11:11"),
    endTime: new Date("2023-09-11T12:11")
  },
  {
    id: 2,
    stationList: STATIONS,
    startTime: new Date("2023-09-11T11:11"),
    endTime: new Date("2023-09-11T12:11")
  }
]

export const EVENTS: EventDto[]=[
  {
    id: 1,
    name: "Wyzwanie",
    place: "Piwnica",
    startTime: new Date("2023-09-11T11:11"),
    endTime: new Date("2023-09-11T12:11"),
    participantIds: [1,2]
  },
  {
    id: 2,
    name: "Turniej",
    place: "Piwnica",
    startTime: new Date("2023-09-13T11:11"),
    endTime: new Date("2023-09-14T11:11"),
    participantIds: [1,2]
  }
]
