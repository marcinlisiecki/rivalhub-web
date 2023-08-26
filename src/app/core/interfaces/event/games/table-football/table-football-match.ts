import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { GameSet } from '@interfaces/event/game-set';

export interface TableFootballMatch {
  id: number;
  team1: UserDetailsDto[];
  team2: UserDetailsDto[];
  sets: GameSet[];
  team1Approval: boolean;
  team2Approval: boolean;
}
