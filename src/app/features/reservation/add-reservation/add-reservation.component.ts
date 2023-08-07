import { Component, Input } from '@angular/core';
import { Station } from '../../../core/interfaces/Station';
import { EventType } from '../../../core/interfaces/event';
import { categoryTypeToLabel } from '../../../core/utils/event';
import { STATIONS } from '../../../mock/stations';
import * as moment from 'moment/moment';
import { ActivatedRoute } from '@angular/router';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss'],
})
export class AddReservationComponent {
  @Input() isInModal: boolean = false;

  stations: Station[] | null = null;

  types: Set<string> = new Set<string>();
  selectedStations: string[] = [];
  date: any;
  startTime: Date = new Date();
  finishTime: Date = new Date(new Date().setHours(new Date().getHours() + 1));
  invalidDate: boolean = false;
  readyDateAndValid: boolean = false;
  emptyData: boolean = false;
  today: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationsService,
  ) {}

  fetchAvailableStations() {
    this.stations = null;

    const formattedStartDate: string = moment(this.startTime).format(
      'DD-MM-yyyy HH:mm',
    );
    const formattedEndDate: string = moment(this.finishTime).format(
      'DD-MM-yyyy HH:mm',
    );
    const organizationId: number = this.route.snapshot.params['id'];

    setTimeout(() => {
      this.organizationService
        .getAvailableStations(
          organizationId,
          formattedStartDate,
          formattedEndDate,
        )
        .subscribe({
          next: (stations: Station[]) => {
            this.types = new Set(stations.map((station) => station.type));

            this.stations = stations;
          },
        });
    }, 1000);
  }

  getCategoryStations(category: EventType | string): Station[] | null {
    return (
      this.stations?.filter((station) => station.type === category) || null
    );
  }

  onSubmit() {
    this.stations = null;

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

    this.fetchAvailableStations();
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
