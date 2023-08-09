import { Component, Input, OnInit } from '@angular/core';

import { Reservation } from '@interfaces/reservation/reservation';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent implements OnInit {
  @Input({ required: true }) reservation!: Reservation;

  formattedStart: string = '';
  formattedEnd: string = '';

  constructor(private organizationService: OrganizationsService) {}

  ngOnInit(): void {
    this.formattedStart = this.organizationService.formatDate(
      this.reservation?.startTime,
    );
    this.formattedEnd = this.organizationService.formatDate(
      this.reservation?.endTime,
    );
  }
}
