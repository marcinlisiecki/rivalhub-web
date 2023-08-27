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
