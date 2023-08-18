import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Station } from '@interfaces/station/station';
import { StationsService } from '@app/core/services/stations/stations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClosestStationAvailable } from '@interfaces/station/closest-station-available';

@Component({
  selector: 'app-category-stations-selector',
  templateUrl: './category-stations-selector.component.html',
  styleUrls: ['./category-stations-selector.component.scss'],
})
export class CategoryStationsSelectorComponent {
  @Input() categoryLabel!: string;
  @Input() stations!: Station[];
  @Input() selectedStations!: string[];
  @Input() closestAvailable!: ClosestStationAvailable;

  @Output() toggleStation: EventEmitter<number> = new EventEmitter<number>();

  protected readonly String = String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stationsService: StationsService,
  ) {}

  protected readonly Date = Date;
}
