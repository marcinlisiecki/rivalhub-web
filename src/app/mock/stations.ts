import { EventType } from '@interfaces/event/event-type';
import { Station } from '@interfaces/station/station';
import { Reservation } from '@interfaces/reservation/reservation';
import { EventDto } from '@interfaces/event/event-dto';
import { Organization } from '@interfaces/organization/organization';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';

export const STATIONS: Station[] = [
  {
    id: 1,
    name: 'Stół nr 1',
    type: EventType.PING_PONG,
    active: true,
  },
  {
    id: 2,
    name: 'Stół nr 2',
    type: EventType.PING_PONG,
    active: true,
  },
  {
    id: 3,
    name: 'Stół nr 1',
    type: EventType.BILLIARDS,
    active: true,
  },
];

let organization: Organization = {
  id: 1,
  name: 'organizacja',
  color: '#960101',
  invitationHash: '',
  imageUrl: null,
};
let user: UserDetailsDto = {
  id: 20,
  name: 'd',
  email: '',
  profilePictureUrl: 'null',
  activationTime: null,
};

export const RESERVATIONS: Reservation[] = [
  {
    id: 1,
    stationList: STATIONS,
    startTime: new Date('2023-09-11T11:11'),
    endTime: new Date('2023-09-11T12:11'),
    organization: organization,
    user: user,
  },
  {
    id: 2,
    stationList: STATIONS,
    startTime: new Date('2023-09-11T11:11'),
    endTime: new Date('2023-09-11T12:11'),
    organization: organization,
    user: user,
  },
  {
    id: 3,
    stationList: STATIONS,
    startTime: new Date('2023-09-11T11:11'),
    endTime: new Date('2023-09-11T12:11'),
    organization: organization,
    user: user,
  },
  {
    id: 4,
    stationList: STATIONS,
    startTime: new Date('2023-09-11T11:11'),
    endTime: new Date('2023-09-11T12:11'),
    organization: organization,
    user: user,
  },
  {
    id: 5,
    stationList: STATIONS,
    startTime: new Date('2023-09-11T11:11'),
    endTime: new Date('2023-09-11T12:11'),
    organization: organization,
    user: user,
  },
];

export const EVENTS: any[] = [
  {
    id: 1,
    name: 'Wyzwanie',
    place: 'Piwnica',
    startTime: new Date('2023-09-11T11:11'),
    endTime: new Date('2023-09-11T12:11'),
    participantIds: [1, 2],
  },
  {
    id: 2,
    name: 'Turniej',
    place: 'Piwnica',
    startTime: new Date('2023-09-13T11:11'),
    endTime: new Date('2023-09-14T11:11'),
    participantIds: [1, 2],
  },
  {
    id: 3,
    name: 'Wyzwanie',
    place: 'Piwnica',
    startTime: new Date('2023-09-11T11:11'),
    endTime: new Date('2023-09-11T12:11'),
    participantIds: [1, 2],
  },
  {
    id: 4,
    name: 'Hodowla jedwabników',
    place: 'Piwnica',
    startTime: new Date('2023-09-11T11:11'),
    endTime: new Date('2023-09-11T12:11'),
    participantIds: [1, 2, 3, 4],
  },
];
