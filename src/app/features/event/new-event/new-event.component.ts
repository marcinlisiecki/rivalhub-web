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

  stations: Station[] = STATIONS;
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

  setFormStep(nextStep: AddEventFormStep): void {
    if (nextStep === AddEventFormStep.RESERVATION && !this.validateDates()) {
      return;
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
