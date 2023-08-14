import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrganizationConfiguratorStep } from '@interfaces/organization/organization-configurator-step';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-configurator',
  templateUrl: './settings-configurator.component.html',
  styleUrls: ['./settings-configurator.component.scss'],
})
export class SettingsConfiguratorComponent {
  @Input() settingsForm!: FormGroup;

  @Output() setStep: EventEmitter<OrganizationConfiguratorStep> =
    new EventEmitter<OrganizationConfiguratorStep>();
  @Output() saveOrganizationSettings: EventEmitter<null> =
    new EventEmitter<null>();

  protected readonly OrganizationConfiguratorStep =
    OrganizationConfiguratorStep;
}
