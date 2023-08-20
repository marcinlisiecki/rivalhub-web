import { Component, Input } from '@angular/core';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';

import { Reservation } from '@interfaces/reservation/reservation';
import { DatePipe } from '@angular/common';
import { DISPLAY_DATE_FORMAT } from '@app/core/constants/date';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
  @Input({ required: true }) reservation!: Reservation;

  constructor(private organizationService: OrganizationsService) {}

  protected readonly DISPLAY_DATE_FORMAT = DISPLAY_DATE_FORMAT;
}
