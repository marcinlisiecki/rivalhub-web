import { Component, Input } from '@angular/core';
import { EventType } from '@interfaces/event/event-type';
import { categoryTypeToLabel } from '../../../core/utils/event';
import { STATIONS } from '../../../mock/stations';
import * as moment from 'moment/moment';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { extractMessage } from '@app/core/utils/apiErrors';
import { NewReservation } from '@interfaces/reservation/new-reservation';
import { Station } from '@interfaces/station/station';
import { StationsService } from '@app/core/services/stations/stations.service';
import { ClosestStationAvailable } from '@interfaces/station/closest-station-available';
import { formatDate } from '@angular/common';

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
  apiError: string | null = null;
  closestAvailable: ClosestStationAvailable[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationsService,
    private stationsService: StationsService,
  ) {}

  formatDate(date: Date): string {
    return moment(date).format('DD-MM-yyyy HH:mm');
  }

  findRightCategory(type: string): ClosestStationAvailable {
    const cat = this.closestAvailable.find(
      (closest: ClosestStationAvailable) => closest.type === type,
    );
    console.log(cat, type);

    return cat!;
  }
  fetchClosestAvailableStations() {
    const organizationId: number = this.route.snapshot.params['id'];
    this.stationsService
      .getClosestAvailableStations(
        organizationId,
        this.startTime,
        this.finishTime,
      )
      .subscribe({
        next: (availableStations: ClosestStationAvailable[]) => {
          this.closestAvailable = availableStations;
          this.closestAvailable.forEach((item) => {
            item.formatedFirstAvailable = this.formatDate(item.firstAvailable);
          });
        },
      });
  }

  getOrganizationCategories() {
    const organizationId: number = this.route.snapshot.params['id'];
    this.organizationService.getEventsCategories(organizationId).subscribe({
      next: (avaliableCategories: EventType[]) => {
        this.types = new Set(avaliableCategories);
      },
    });
  }

  fetchAvailableStations() {
    this.stations = null;
    const organizationId: number = this.route.snapshot.params['id'];
    this.getOrganizationCategories();
    setTimeout(() => {
      this.organizationService.getEvents(organizationId);
      this.stationsService
        .getAvailableStations(organizationId, this.startTime, this.finishTime)
        .subscribe({
          next: (stations: Station[]) => {
            this.stations = stations;
          },
        });
    }, 1000);
    this.fetchClosestAvailableStations();
  }

  getCategoryStations(category: EventType | string): Station[] | null {
    return (
      this.stations?.filter((station) => station.type === category) || null
    );
  }

  fetchStations() {
    this.stations = null;
    this.selectedStations = [];

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

  toggleSelectedStation(idNumber: number) {
    const id = idNumber.toString();

    if (this.selectedStations.includes(id)) {
      this.selectedStations.splice(this.selectedStations.indexOf(id), 1);
      return;
    }

    this.selectedStations.push(id);
  }

  onSubmit() {
    this.apiError = null;

    if (this.selectedStations.length === 0) {
      return;
    }

    const reservation: NewReservation = {
      startTime: this.startTime,
      endTime: this.finishTime,
      stationsIdList: this.selectedStations.map((item) => parseFloat(item)),
    };
    const organizationId: number = this.route.snapshot.params['id'];

    this.organizationService
      .newReservation(organizationId, reservation)
      .subscribe({
        next: () => {
          this.router.navigateByUrl(`/organizations/${organizationId}`).then();
        },
        error: (err) => {
          this.apiError = extractMessage(err);
        },
      });
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
