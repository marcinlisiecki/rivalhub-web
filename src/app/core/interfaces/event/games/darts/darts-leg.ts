import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { DartQueue } from './dart-queue';

export interface DartsLeg {
  legid: number;
  dartFormat: string;
  dartRule: string;
  participants: UserDetailsDto[];
  queue: DartQueue[];
}
