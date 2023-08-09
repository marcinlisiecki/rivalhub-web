import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
})
export class DateSelectorComponent {
  @Input() dateForm!: FormGroup;
  @Input() dateError!: string | null;

  @Output() setFormStep: EventEmitter<AddEventFormStep> =
    new EventEmitter<AddEventFormStep>();

  today: Date = new Date();

  protected readonly AddEventFormStep = AddEventFormStep;
}
