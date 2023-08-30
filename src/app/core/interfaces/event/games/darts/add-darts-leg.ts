import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';

export interface AddDartsLeg {
  DartFormat: string;
  DartRule: string;
  Participants: UserDetailsDto[];
}
