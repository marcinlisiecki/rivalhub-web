import { Component, Input, OnInit } from '@angular/core';

import { Reservation } from '@interfaces/reservation/reservation';
import { EventDto } from '@interfaces/event/event-dto';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { categoryTypeToLabel } from '@app/core/utils/event';

@Component({
  selector: 'app-dashboard-activities-panel',
  templateUrl: './dashboard-activities-panel.component.html',
  styleUrls: ['./dashboard-activities-panel.component.scss'],
})
export class DashboardActivitiesPanelComponent implements OnInit {
  @Input({ required: true }) reservations!: Reservation[];
  @Input({ required: true }) events!: EventDto[];

  organizationId!: number;
  paramsSubscription?: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe({
      next: (params: Params) => {
        this.organizationId = params['id'];
      },
    });
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
