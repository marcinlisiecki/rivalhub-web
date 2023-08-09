import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventType } from '@interfaces/event/event-type';
import { categoryTypeToLabel } from '../../../../core/utils/event';
import { AvailableEvent } from '@interfaces/event/available-event';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
})
export class CategorySelectorComponent {
  @Input() events!: AvailableEvent[];
  @Input() selectedEventType!: EventType | null;

  @Output() selectEvent: EventEmitter<EventType> =
    new EventEmitter<EventType>();
  @Output() setFormStep: EventEmitter<AddEventFormStep> =
    new EventEmitter<AddEventFormStep>();

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
  protected readonly AddEventFormStep = AddEventFormStep;
}
