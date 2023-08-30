import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';

export interface DartsLeg {
  matchId: number;
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
  userApprovalMap: {
    [id: number]: boolean;
  };
}
