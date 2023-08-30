import { Component, Input, OnInit } from '@angular/core';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';

import { Reservation } from '@interfaces/reservation/reservation';
import { DISPLAY_DATE_FORMAT } from '@app/core/constants/date';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  @Input({ required: true }) reservation!: Reservation;

  routerLink!: string;
  constructor(private route: RouterModule) {}

  ngOnInit(): void {
    // Directly set the routerLink attribute here
    const organizationId = this.reservation.organization.id;
    const reservationId = this.reservation.id;
    this.routerLink = `/organizations/${organizationId}/reservations/${reservationId}`;
  }

  protected readonly DISPLAY_DATE_FORMAT = DISPLAY_DATE_FORMAT;
}
