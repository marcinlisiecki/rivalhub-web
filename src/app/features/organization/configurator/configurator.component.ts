import { Component, OnInit } from '@angular/core';
import { EventsService } from '@app/core/services/events/events.service';
import { EventType } from '@interfaces/event/event-type';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';
import { OrganizationConfiguratorStep } from '@interfaces/organization/organization-configurator-step';
import { firstValueFrom } from 'rxjs';
import { extractMessage } from '@app/core/utils/apiErrors';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorsService } from '@app/core/services/errors/errors.service';

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

  settingsForm: FormGroup = new FormGroup({
    onlyAdminCanSeeInvitationLink: new FormControl(true, []),
  });

  isCategoryStepLoading: boolean = false;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private organizationsService: OrganizationsService,
    private router: Router,
    private errorsService: ErrorsService,
  ) {
    this.organizationId = parseInt(this.route.snapshot.params['id']);
  }

  async setStep(newStep: OrganizationConfiguratorStep) {
    if (newStep === OrganizationConfiguratorStep.STATIONS) {
      this.isCategoryStepLoading = true;

      try {
        await this.setOrganizationEventTypes();
      } catch (err) {
        this.errorsService.createErrorMessage(extractMessage(err));
      }

      this.isCategoryStepLoading = false;
    }

    this.configuratorStep = newStep;
  }

  setOrganizationEventTypes() {
    return new Promise<void>(async (resolve, reject) => {
      const activeEventTypes = this.activeEventTypes;
      const inactiveEventTypes = this.possibleEventTypes.filter(
        (type) => !this.activeEventTypes.includes(type),
      );

      for (let type of activeEventTypes) {
        try {
          await firstValueFrom(
            this.eventsService.addOrganizationEventType(
              this.organizationId,
              type,
            ),
          );
        } catch (err) {
          reject(err);
        }
      }

      for (let type of inactiveEventTypes) {
        try {
          await firstValueFrom(
            this.eventsService.deleteOrganizationEventType(
              this.organizationId,
              type,
            ),
          );
        } catch (err) {
          reject(err);
        }
      }

      resolve();
    });
  }

  saveOrganizationSettings() {
    this.organizationsService
      .setOrganizationSettings(
        this.organizationId,
        this.settingsForm.get('onlyAdminCanSeeInvitationLink')?.value,
      )
      .subscribe({
        next: () => {
          this.router
            .navigateByUrl(
              `/organizations/${this.organizationId}?configured=true`,
            )
            .then();
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
