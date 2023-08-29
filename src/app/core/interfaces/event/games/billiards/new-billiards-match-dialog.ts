import { WinType } from '@interfaces/event/games/billiards/billiards-win-type';

export interface NewBilliardsMatchDialog {
  team1Won: boolean;
  team2Won: boolean;
  winType: WinType;
  howManyBillsLeftTeam1: number;
  howManyBillsLeftTeam2: number;
}
