import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AddEventFormStep,
  AvailableEvent,
  EventType,
} from '../../../../core/interfaces/event';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent {
  @Input() basicInfoForm!: FormGroup;

  @Output() setFormStep: EventEmitter<AddEventFormStep> =
    new EventEmitter<AddEventFormStep>();

  protected readonly AddEventFormStep = AddEventFormStep;
}
