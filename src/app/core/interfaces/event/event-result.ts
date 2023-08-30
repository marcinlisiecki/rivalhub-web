import { UserDetailsDto } from '../user/user-details-dto';
import { EventType } from './event-type';

export interface EventResult {
  id: number;
  organization: string;
  category: EventType;
  isWinner?: boolean;
  startTime: Date;
  endTime?: Date;
  team1: UserDetailsDto[];
  team2: UserDetailsDto[];
  finished?: boolean;
}
