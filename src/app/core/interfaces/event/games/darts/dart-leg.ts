import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';

export interface DartsLeg {
  id: number;
  dartFormat: string;
  dartMode: string;
  participants: UserDetailsDto[];
  scoresInMatch: number[][];
  bounceOutsInRound: number[][];
  pointsLeftInLegAfterRound: number[][];
  pointsLeftInLeg: number[];
  placesInLeg: number[];
  bounceOutsInLeg: number[];
  bestRoundScoresInLeg: number[];
  numberOfRoundsPlayedInLeg: number[];
  approved: boolean;
  userApprovalMap: {
    [id: number]: boolean;
  };
}
