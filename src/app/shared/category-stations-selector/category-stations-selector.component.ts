import { Component, Input } from '@angular/core';
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

  protected readonly String = String;
}
