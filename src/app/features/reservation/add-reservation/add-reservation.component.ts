import { Component, Input } from '@angular/core';
import { Station } from '../../../core/interfaces/Station';
import { EventType } from '../../../core/interfaces/event';
import { categoryTypeToLabel } from '../../../core/utils/event';
import { STATIONS } from '../../../mock/stations';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss'],
})
export class AddReservationComponent {
  @Input() isInModal: boolean = false;

  stations: Station[] = STATIONS;

  types = new Set(this.stations.map((station) => station.type));
  selectedStations: string[] = [];
  date: any;
  startTime: Date = new Date();
  finishTime: Date = new Date(new Date().setHours(new Date().getHours() + 1));
  invalidDate: boolean = false;
  readyDateAndValid: boolean = false;
  emptyData: boolean = false;
  today: Date = new Date();

  getCategoryStations(category: EventType) {
    return this.stations.filter((station) => station.type === category);
  }

  onSubmit() {
    if (this.startTime == null || this.finishTime == null) {
      this.emptyData = true;
      return;
    }
    this.emptyData = false;
    if (this.startTime >= this.finishTime) {
      this.invalidDate = true;
      this.readyDateAndValid = false;
    } else {
      this.invalidDate = false;
      this.readyDateAndValid = true;
    }
    return;
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
