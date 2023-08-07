import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Station } from '../../core/interfaces/Station';

@Component({
  selector: 'app-category-stations-selector',
  templateUrl: './category-stations-selector.component.html',
  styleUrls: ['./category-stations-selector.component.scss'],
})
export class CategoryStationsSelectorComponent {
  @Input() categoryLabel!: string;
  @Input() stations!: Station[];
  @Input() selectedStations!: string[];

  @Output() toggleStation: EventEmitter<number> = new EventEmitter<number>();

  protected readonly String = String;
}
