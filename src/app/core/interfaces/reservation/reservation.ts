import { Station } from '@interfaces/station/station';
import { Organization } from '@interfaces/organization/organization';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';

export interface Reservation {
  id: number;
  stationList: Station[];
  startTime: Date;
  endTime: Date;
  user: UserDetailsDto;
  organization: Organization;
}
