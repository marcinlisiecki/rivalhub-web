import { DartsLeg } from '@app/core/interfaces/event/games/darts/darts-leg';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';

export const MOCKLEGS: DartsLeg[] = [
  {
    legid: 1,
    dartFormat: '301',
    dartRule: 'doubleIn',
    participants: [],
    queue: [
      {
        queueid: 1,
        score: [15, 25, 55, 15, 25, 55],
        bounceOuts: [2, 0, 0, 2, 1, 1],
      },
      {
        queueid: 2,
        score: [32, 62, 0, 15, 25, 55],
        bounceOuts: [0, 1, 3, 3, 1, 2],
      },
      {
        queueid: 3,
        score: [12, 64, 24, 15, 25, 55],
        bounceOuts: [3, 0, 1, 1, 2, 1],
      },
      {
        queueid: 4,
        score: [31, 64, 22, 15, 25, 55],
        bounceOuts: [0, 0, 1, 1, 0, 1],
      },
      {
        queueid: 5,
        score: [42, 12, 4, 15, 25, 55],
        bounceOuts: [0, 0, 1, 2, 1, 3],
      },
    ],
  },
];

export const MOCKLEGS2: DartsLeg[] = [
  {
    legid: 1,
    dartFormat: '301',
    dartRule: 'doubleIn',
    participants: [],
    queue: [
      {
        queueid: 1,
        score: [15, 25],
        bounceOuts: [2, 0],
      },
      {
        queueid: 2,
        score: [32, 62],
        bounceOuts: [0, 1],
      },
      {
        queueid: 3,
        score: [12, 64],
        bounceOuts: [3, 0],
      },
      {
        queueid: 4,
        score: [31, 64],
        bounceOuts: [0, 0],
      },
      {
        queueid: 5,
        score: [42, 12],
        bounceOuts: [0, 0],
      },
    ],
  },
];
