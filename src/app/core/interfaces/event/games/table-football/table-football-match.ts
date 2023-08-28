import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { GameSet } from '@interfaces/event/game-set';

export interface TableFootballMatch {
  id: number;
  approved: boolean;
  team1: UserDetailsDto[];
  team2: UserDetailsDto[];
  sets: GameSet[];
  userApprovalMap: {
    [id: number]: boolean;
  };
}
