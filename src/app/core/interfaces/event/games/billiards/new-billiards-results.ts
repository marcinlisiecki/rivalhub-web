import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { WinType } from '@interfaces/event/games/billiards/billiards-win-type';
import { EventType } from '@interfaces/event/event-type';

export interface NewBilliardsResults {
  team1PlaysFull: boolean;
  team1HadPottedFirst: boolean;
  team1Won: boolean;
  team2Won: boolean;
  winType: WinType;
  howManyBillsLeftTeam1: number;
  howManyBillsLeftTeam2: number;
}
