import { UserDetailsDto } from '@interfaces/user/user-details-dto';

export interface RankingDTO {
  userDetailsDto: UserDetailsDto;
  games: number;
  winGames: number;
}
