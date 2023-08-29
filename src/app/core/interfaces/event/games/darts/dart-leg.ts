import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';

export interface DartsLeg {
  dartFormat: string;
  dartMode: string;
  participants: UserDetailsDto[];
  scoresInMatch: number[][];
  pointsLeftInLeg: number[];
  placesInLeg: number[];
  bounceOutsInLeg: number[];
  bestRoundScoresInLeg: number[];
  numberOfRoundsPlayedInLeg: number[];
}
