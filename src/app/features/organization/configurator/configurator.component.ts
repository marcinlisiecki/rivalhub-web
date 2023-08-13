import { Component, OnInit } from '@angular/core';
import { EventsService } from '@app/core/services/events/events.service';
import { EventType } from '@interfaces/event/event-type';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { ActivatedRoute } from '@angular/router';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';
import { OrganizationConfiguratorStep } from '@interfaces/organization/organization-configurator-step';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
})
export class ConfiguratorComponent implements OnInit {
  configuratorStep: OrganizationConfiguratorStep =
    OrganizationConfiguratorStep.CATEGORIES;

  possibleEventTypes: EventType[] = [];
  activeEventTypes: EventType[] = [];
  organizationId: number;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
  ) {
    this.organizationId = parseInt(this.route.snapshot.params['id']);
  }

  setStep(newStep: OrganizationConfiguratorStep) {
    this.configuratorStep = newStep;
  }

  toggleAvailableEventType(eventType: EventType) {
    if (this.activeEventTypes.includes(eventType)) {
      this.activeEventTypes = this.activeEventTypes.filter(
        (type) => type !== eventType,
      );
    } else {
      this.activeEventTypes.push(eventType);
    }
  }

  ngOnInit(): void {
    this.fetchAllEventTypes();
    this.fetchActiveEventTypes();
  }

  fetchAllEventTypes() {
    this.eventsService.getAllEventTypesInApp().subscribe({
      next: (types: EventType[]) => {
        this.possibleEventTypes = types;
      },
    });
  }

  fetchActiveEventTypes() {
    this.eventsService
      .getEventTypesInOrganization(this.organizationId)
      .subscribe({
        next: (types: EventType[]) => {
          this.activeEventTypes = types;
        },
      });
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
  protected readonly AddEventFormStep = AddEventFormStep;
  protected readonly OrganizationConfiguratorStep =
    OrganizationConfiguratorStep;
}
