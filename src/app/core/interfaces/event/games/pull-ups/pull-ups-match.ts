import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { PullUpsSeries } from '@interfaces/event/games/pull-ups/pull-ups-series';
import { Place } from '@interfaces/event/games/place';

export interface PullUpsMatch {
  id: number;
  userDetailsDtos: UserDetailsDto[];
  scores: PullUpsSeries[];
  places: Place[];
  approved: boolean;
  userApprovalMap: {
    [id: number]: boolean;
  };
}
