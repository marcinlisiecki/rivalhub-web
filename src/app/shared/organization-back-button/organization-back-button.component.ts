import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-organization-back-button',
  templateUrl: './organization-back-button.component.html',
  styleUrls: ['./organization-back-button.component.scss'],
})
export class OrganizationBackButtonComponent {
  @Input({ required: true }) organizationId!: number;
}
