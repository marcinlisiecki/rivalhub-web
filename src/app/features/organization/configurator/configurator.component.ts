import { Component, OnInit } from '@angular/core';
import { EventsService } from '@app/core/services/events/events.service';
import { EventType } from '@interfaces/event/event-type';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { ActivatedRoute } from '@angular/router';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
})
export class ConfiguratorComponent implements OnInit {
  possibleEventTypes: Set<EventType> = new Set();
  activeEventTypes: Set<EventType> = new Set();
  organizationId: number;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
  ) {
    this.organizationId = parseInt(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.fetchAllEventTypes();
    this.fetchActiveEventTypes();
  }

  isEventTypeActive(type: EventType): boolean {
    return Array.from(this.activeEventTypes).includes(type);
  }

  fetchAllEventTypes() {
    this.eventsService.getAllEventTypesInApp().subscribe({
      next: (types: Set<EventType>) => {
        this.possibleEventTypes = types;
      },
    });
  }

  fetchActiveEventTypes() {
    this.eventsService
      .getEventTypesInOrganization(this.organizationId)
      .subscribe({
        next: (types: Set<EventType>) => {
          this.activeEventTypes = types;
        },
      });
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
  protected readonly AddEventFormStep = AddEventFormStep;
}
