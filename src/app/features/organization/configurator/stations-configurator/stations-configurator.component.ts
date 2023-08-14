import { Component, EventEmitter, Output } from '@angular/core';
import { OrganizationConfiguratorStep } from '@interfaces/organization/organization-configurator-step';

@Component({
  selector: 'app-stations-configurator',
  templateUrl: './stations-configurator.component.html',
  styleUrls: ['./stations-configurator.component.scss'],
})
export class StationsConfiguratorComponent {
  @Output() setStep: EventEmitter<OrganizationConfiguratorStep> =
    new EventEmitter<OrganizationConfiguratorStep>();

  protected readonly OrganizationConfiguratorStep =
    OrganizationConfiguratorStep;
}
