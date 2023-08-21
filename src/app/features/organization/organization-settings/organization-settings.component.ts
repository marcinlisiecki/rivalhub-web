import { Component } from '@angular/core';
import { EventType } from '@interfaces/event/event-type';
import { FormControl, FormGroup } from '@angular/forms';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { ErrorsService } from '@app/core/services/errors/errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@app/core/utils/apiErrors';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { OrganizationSettings } from '@interfaces/organization/organization-settings';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.scss'],
})
export class OrganizationSettingsComponent {
  possibleEventTypes: EventType[] = [];
  activeEventTypes: EventType[] = [];
  organizationId: number;
  isLoading: boolean = false;

  settingsForm: FormGroup = new FormGroup({
    onlyAdminCanSeeInvitationLink: new FormControl(true, []),
  });

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private organizationsService: OrganizationsService,
    private router: Router,
    private errorsService: ErrorsService,
    private messageService: MessageService,
  ) {
    this.organizationId = parseInt(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.fetchAllEventTypes();
    this.fetchActiveEventTypes();
    this.fetchOrganizationsSettings();
  }

  onSave() {
    this.isLoading = true;
    this.setOrganizationEventTypes();
    this.saveOrganizationSettings();
  }

  fetchOrganizationsSettings() {
    this.organizationsService
      .getOrganizationSettings(this.organizationId)
      .subscribe({
        next: (settings: OrganizationSettings) => {
          this.settingsForm
            .get('onlyAdminCanSeeInvitationLink')
            ?.setValue(settings.onlyAdminCanSeeInvitationLink);
        },
      });
  }

  setOrganizationEventTypes() {
    const activeEventTypes = this.activeEventTypes;
    const inactiveEventTypes = this.possibleEventTypes.filter(
      (type) => !this.activeEventTypes.includes(type),
    );
    this.organizationsService
      .setOrganizationEventTypes(
        this.organizationId,
        activeEventTypes,
        inactiveEventTypes,
      )
      .then();
  }

  saveOrganizationSettings() {
    this.organizationsService
      .setOrganizationSettings(
        this.organizationId,
        this.settingsForm.get('onlyAdminCanSeeInvitationLink')?.value,
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            life: 10 * 1000,
            summary: 'Ustawienia zostały pomyślnie zapisane',
          });
        },
        error: (err: HttpErrorResponse) => {
          this.errorsService.createErrorMessage(extractMessage(err));
        },
      });
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
}
