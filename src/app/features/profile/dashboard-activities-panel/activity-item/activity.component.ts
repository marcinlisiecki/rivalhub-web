import { Component, Input } from '@angular/core';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';

import { Reservation } from '@interfaces/reservation/reservation';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
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
