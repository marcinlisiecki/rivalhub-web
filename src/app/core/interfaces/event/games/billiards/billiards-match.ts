import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { EventType } from '@interfaces/event/event-type';
import { WinType } from '@interfaces/event/games/billiards/billiards-win-type';

export interface BilliardsMatch {
  id: number;
  team1: UserDetailsDto[];
  team2: UserDetailsDto[];
  team1PlaysFull: boolean;
  team1HadPottedFirst: boolean;
  team1Won: boolean;
  team2Won: boolean;
  winType: WinType;
  howManyBillsLeftTeam1: number;
  howManyBillsLeftTeam2: number;
  eventType: EventType;
  eventId: number;
  approved: boolean;
  userApprovalMap: {
    [id: number]: boolean;
  };
}
