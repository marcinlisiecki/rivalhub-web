import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AddEventFormStep,
  AvailableEvent,
  EventType,
} from '../../../../core/interfaces/event';
import { categoryTypeToLabel } from '../../../../core/utils/event';

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
