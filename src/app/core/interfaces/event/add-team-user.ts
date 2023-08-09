import { UserDetailsDto } from '@interfaces/user/user-details-dto';

export interface AddTeamUser {
  teamIndex: number;
  user: UserDetailsDto;
}
