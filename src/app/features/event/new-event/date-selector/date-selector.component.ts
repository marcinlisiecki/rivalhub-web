import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddEventFormStep } from '../../../../core/interfaces/event';
import { FormGroup } from '@angular/forms';

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

  protected readonly AddEventFormStep = AddEventFormStep;
}
