import { Component } from '@angular/core';
import {
  AvailableEvent,
  EventType,
  AddEventFormStep,
} from '../../../core/interfaces/event';
import { DialogService } from 'primeng/dynamicdialog';
import { Station } from '../../../core/interfaces/Station';
import { STATIONS } from '../../../mock/stations';
import { MenuItem } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ADD_EVENT_FORM_STEPS,
  AVAILABLE_EVENTS,
} from '../../../core/constants/event';
import { categoryTypeToLabel } from '../../../core/utils/event';
import * as moment from 'moment';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
  providers: [DialogService],
})
export class NewEventComponent {
  formStep: AddEventFormStep = AddEventFormStep.CATEGORY;
  formSteps: MenuItem[] = ADD_EVENT_FORM_STEPS;
  formStepIndex: number = 0;

  events: AvailableEvent[] = AVAILABLE_EVENTS;
  selectedEventType: EventType | null = null;

  stations: Station[] = [];
  selectedStations: string[] = [];

  dateError: string | null = null;

  basicInfoForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    description: new FormControl('', [Validators.maxLength(1000)]),
  });

  dateForm: FormGroup = new FormGroup({
    startDate: new FormControl<Date>(new Date(), [Validators.required]),
    endDate: new FormControl<Date>(
      new Date(new Date().setHours(new Date().getHours() + 1)),
      [Validators.required],
    ),
  });

  constructor(
    private organizationService: OrganizationsService,
    private route: ActivatedRoute,
  ) {}

  getOnlyCategoryStations(): Station[] {
    return this.stations.filter(
      (station) => station.type === this.selectedEventType,
    );
  }

  validateDates(): boolean {
    const startDate: Date = this.dateForm.get('startDate')?.value;
    const endDate: Date = this.dateForm.get('endDate')?.value;

    if (startDate.getTime() > endDate.getTime()) {
      this.dateError = 'Godzina startowa musi być przed godziną zakończenia';
      return false;
    }

    return true;
  }

  fetchAvailableStations() {
    const startDate = this.dateForm.get('startDate')?.value;
    const endDate = this.dateForm.get('endDate')?.value;

    const formattedStartDate: string =
      moment(startDate).format('DD-MM-yyyy HH:mm');
    const formattedEndDate: string = moment(endDate).format('DD-MM-yyyy HH:mm');
    const organizationId: number = this.route.snapshot.params['id'];

    if (this.selectedEventType === null) {
      return;
    }

    this.organizationService
      .getAvailableStations(
        organizationId,
        formattedStartDate,
        formattedEndDate,
        this.selectedEventType,
      )
      .subscribe({
        next: (stations: Station[]) => {
          this.stations = stations;
        },
      });
  }

  setFormStep(nextStep: AddEventFormStep): void {
    if (nextStep === AddEventFormStep.RESERVATION && !this.validateDates()) {
      return;
    }

    if (nextStep === AddEventFormStep.RESERVATION) {
      this.fetchAvailableStations();
    }

    this.formStepIndex = nextStep;
    this.formStep = nextStep;
  }

  selectEvent(eventType: EventType): void {
    this.selectedStations = [];
    this.selectedEventType = eventType;
  }

  protected readonly AddEventFormStep = AddEventFormStep;
  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
