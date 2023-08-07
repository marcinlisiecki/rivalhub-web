import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';
import { Station } from '@interfaces/station/station';

@Component({
  selector: 'app-station-selector',
  templateUrl: './station-selector.component.html',
  styleUrls: ['./station-selector.component.scss'],
})
export class StationSelectorComponent {
  @Input() categoryLabel!: string;
  @Input() stations: Station[] | null = null;
  @Input() selectedStations!: string[];

  @Output() setFormStep: EventEmitter<AddEventFormStep> =
    new EventEmitter<AddEventFormStep>();
  @Output() toggleStation: EventEmitter<number> = new EventEmitter<number>();

  protected readonly AddEventFormStep = AddEventFormStep;
  protected readonly String = String;
}
