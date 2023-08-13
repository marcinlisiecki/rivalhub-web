import { Component, Input } from '@angular/core';
import { ClosestStationAvailable } from '@interfaces/station/closest-station-available';

@Component({
  selector: 'app-no-available-stations',
  templateUrl: './no-available-stations.component.html',
  styleUrls: ['./no-available-stations.component.scss'],
})
export class NoAvailableStationsComponent {
  @Input() closestAvailable!: ClosestStationAvailable[];
}
