import { Component, EventEmitter, Input, Output } from '@angular/core';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { EventType } from '@interfaces/event/event-type';
import { OrganizationConfiguratorStep } from '@interfaces/organization/organization-configurator-step';

@Component({
  selector: 'app-available-events-configurator',
  templateUrl: './available-events-configurator.component.html',
  styleUrls: ['./available-events-configurator.component.scss'],
})
export class AvailableEventsConfiguratorComponent {
  @Input() possibleEventTypes: EventType[] = [];
  @Input() activeEventTypes: EventType[] = [];

  @Output() toggleAvailableEventType: EventEmitter<EventType> =
    new EventEmitter<EventType>();
  @Output() setStep: EventEmitter<OrganizationConfiguratorStep> =
    new EventEmitter<OrganizationConfiguratorStep>();

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
  protected readonly OrganizationConfiguratorStep =
    OrganizationConfiguratorStep;
}
