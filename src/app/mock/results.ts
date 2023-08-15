import { PingPongResult } from '@app/core/interfaces/event/games/ping-pong/ping-pong-result';
import { EventType } from '@app/core/interfaces/event/event-type';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
export const GAMES: PingPongResult[] = [
  {
    id: 1,
    category: EventType.PING_PONG,
    organization: 'NCDC',
    isWinner: true,
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 2),
    team1: [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        profilePictureUrl: 'https://www.w3schools.com/howto/img_avatar.png',
        activationTime: new Date(Date.now() - 2323),
      },
    ],
    team2: [
      {
        id: 1,
        name: 'Jan Kowalski',
        email: 'jankowalski@wp.pl',
        profilePictureUrl: 'https://www.w3schools.com/howto/img_avatar.png',
        activationTime: new Date(Date.now() + 5020),
      },
    ],
    sets: [
      {
        team1Score: 11,
        team2Score: 9,
      },
      {
        team1Score: 11,
        team2Score: 9,
      },
      {
        team1Score: 11,
        team2Score: 9,
      },
    ],
  },
  {
    id: 2,
    category: EventType.PING_PONG,
    organization: 'NCDC',

    isWinner: false,
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 2),
    team1: [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        profilePictureUrl: 'https://www.w3schools.com/howto/img_avatar.png',
        activationTime: new Date(Date.now() - 2323),
      },
    ],
    team2: [
      {
        id: 1,
        name: 'Jan Kowalski',
        email: 'jankowalski@wp.pl',
        profilePictureUrl: 'https://www.w3schools.com/howto/img_avatar.png',
        activationTime: new Date(Date.now() + 5020),
      },
    ],
    sets: [
      {
        team1Score: 11,
        team2Score: 9,
      },
      {
        team1Score: 11,
        team2Score: 9,
      },
      {
        team1Score: 11,
        team2Score: 9,
      },
    ],
  },
];
