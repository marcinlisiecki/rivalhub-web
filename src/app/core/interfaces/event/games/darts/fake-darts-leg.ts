import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { DartQueue } from './dart-queue';

//Bardzo, ale to bardzo przepraszam za to co tutaj zaszło.
export interface FakeDartsLeg {
  dateFormat: string;
  dartMode: string;
  id: number;
  userDetails: UserDetailsDto[];
  scoresInMatch: number[][][];
  bounceOutsInRound: number[][][];
  pointsLeftInLegAfterRound: number[][][];
  pointsLeftInLeg: number[][];
  placesInLeg: number[][];
  bounceOutsInLeg: number[][];
  bestRoundScoresInLeg: number[][];
  numberOfRoundsPlayedInLeg: number[][];
  approved: boolean;
  userApprovalMap: {
    [id: number]: boolean;
  };
}
