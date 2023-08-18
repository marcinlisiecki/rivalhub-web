import { Component, Input, OnInit } from '@angular/core';

import { Reservation } from '@interfaces/reservation/reservation';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { DatePipe } from '@angular/common';
import { DISPLAY_DATE_FORMAT } from '@app/core/constants/date';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent {
  @Input({ required: true }) reservation!: Reservation;

  constructor(
    private organizationService: OrganizationsService,
    private datePipe: DatePipe,
  ) {}

  protected readonly DISPLAY_DATE_FORMAT = DISPLAY_DATE_FORMAT;
}
