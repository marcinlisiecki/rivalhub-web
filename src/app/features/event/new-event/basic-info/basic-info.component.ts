import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventType } from '@interfaces/event/event-type';
import { FormGroup } from '@angular/forms';
import { AvailableEvent } from '@interfaces/event/available-event';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';

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
