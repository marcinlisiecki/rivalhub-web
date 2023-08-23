import { Component, Input, OnInit } from '@angular/core';

import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute } from '@angular/router';
import { EventType } from '@interfaces/event/event-type';

@Component({
  selector: 'app-dashboard-users-panel',
  templateUrl: './dashboard-users-panel.component.html',
  styleUrls: ['./dashboard-users-panel.component.scss'],
})
export class DashboardUsersPanelComponent implements OnInit {
  @Input({ required: true }) users!: UserDetailsDto[];
  eventTypes: EventType[] | null = null;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.fetchActiveEventTypes(params['id']);
      },
    });
  }

  fetchActiveEventTypes(organizationId: number) {
    this.eventsService.getEventTypesInOrganization(organizationId).subscribe({
      next: (eventTypes: EventType[]) => {
        this.eventTypes = eventTypes;
      },
    });
  }
}
