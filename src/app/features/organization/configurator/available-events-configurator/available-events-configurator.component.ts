import { Component, EventEmitter, Input, Output } from '@angular/core';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { EventType } from '@interfaces/event/event-type';
import { OrganizationConfiguratorStep } from '@interfaces/organization/organization-configurator-step';
import { ActivatedRoute, Router } from '@angular/router';
import { EventIcon } from '@interfaces/event/event-icon';

@Component({
  selector: 'app-available-events-configurator',
  templateUrl: './available-events-configurator.component.html',
  styleUrls: ['./available-events-configurator.component.scss'],
})
export class AvailableEventsConfiguratorComponent {
  @Input() possibleEventTypes: EventType[] = [];
  @Input() activeEventTypes: EventType[] = [];
  @Input() isLoading: boolean = false;

  @Output() toggleAvailableEventType: EventEmitter<EventType> =
    new EventEmitter<EventType>();
  @Output() setStep: EventEmitter<OrganizationConfiguratorStep> =
    new EventEmitter<OrganizationConfiguratorStep>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  skipConfiguration() {
    const id = this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/organizations/${id}`).then();
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
  protected readonly OrganizationConfiguratorStep =
    OrganizationConfiguratorStep;
  protected readonly EventIcon = EventIcon;
}
