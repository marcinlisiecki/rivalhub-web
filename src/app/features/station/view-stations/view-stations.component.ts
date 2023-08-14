import { Component, Input, OnInit } from '@angular/core';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { ActivatedRoute } from '@angular/router';
import { extractMessage } from '@app/core/utils/apiErrors';
import { StationsService } from '@app/core/services/stations/stations.service';
import { EventType } from '@interfaces/event/event-type';
import { HttpResponse } from '@angular/common/http';
import { Station } from '@app/core/interfaces/station/station';
import { NewStation } from '@app/core/interfaces/station/new-station';
import { ConfirmationService } from 'primeng/api';
import { EventsService } from '@app/core/services/events/events.service';
@Component({
  selector: 'app-view-stations',
  templateUrl: './view-stations.component.html',
  styleUrls: ['./view-stations.component.scss'],
})
export class ViewStationsComponent implements OnInit {
  @Input() showHeading: boolean = true;

  stations: Station[] = [];
  organizationId!: number;
  apiError: string | null = null;
  inputError: string | null = null;

  newStation: NewStation = {
    name: '',
    type: EventType.PING_PONG,
    active: false,
  };

  clonedStations: { [s: string]: Station } = {};

  stationTypes: any = Object.keys(EventType);

  constructor(
    private route: ActivatedRoute,
    private stationsService: StationsService,
    private confirmationService: ConfirmationService,
    private eventsService: EventsService,
  ) {
    this.route.params.subscribe((params) => {
      this.organizationId = params['id'];
    });
  }

  ngOnInit(): void {
    this.stationsService
      .getOrganizationEditStations(this.organizationId)
      .subscribe({
        next: (res: Station[]) => {
          this.stations = res;
        },
        error: (err: unknown) => {
          this.apiError = extractMessage(err);
        },
      });

    this.fetchStationTypes();
  }

  fetchStationTypes() {
    this.eventsService
      .getEventTypesInOrganization(this.organizationId)
      .subscribe((types) => {
        this.stationTypes = types;
        this.newStation = {
          name: '',
          type: types[0] || null,
          active: false,
        };
      });
  }

  addNewStation() {
    //new variable station withour id
    //dodaj rekord do bazy
    let station: Station;

    this.stationsService
      .saveStation(this.organizationId, this.newStation)
      .subscribe({
        next: (res: Station) => {
          station = res;

          this.stations.push(station);

          // Przejdź w tryb edycji dla nowego rekordu
          this.onRowEditInit(station);
        },
        error: (err: unknown) => {
          this.apiError = extractMessage(err);
          return;
        },
      });

    // Resetuj nowy rekord do domyślnych wartości
    this.newStation = {
      name: '',
      type: EventType.PING_PONG,
      active: false,
    };
  }

  editStation(station: Station): void {
    this.stationsService.updateStation(this.organizationId, station).subscribe({
      next: () => {},
      error: (err: unknown) => {
        this.apiError = extractMessage(err);
      },
    });
  }

  deleteStation(station: Station): void {
    this.stationsService
      .deleteStation(this.organizationId, station.id)
      .subscribe({
        next: () => {
          console.log('ok');
          this.stations = this.stations.filter(
            (item) => item.id !== station.id,
          );
        },
        error: (err: unknown) => {
          this.apiError = extractMessage(err);
        },
      });
  }

  onRowEditInit(station: Station) {
    this.clonedStations[station.id.toString() as string] = { ...station };
  }

  onRowAdd() {
    //validate inputerror between 3 and 255
    //trim name
    this.newStation.name = this.newStation.name.trim();
    if (this.newStation.name.length < 3 || this.newStation.name.length > 255) {
      this.inputError = 'Nazwa stanowiska musi mieć od 3 do 255 znaków';
      return;
    }
    this.inputError = null;
    this.addNewStation();
  }

  onRowEditSave(station: Station) {
    this.editStation(station);
  }

  onRowDelete(event: Event, station: Station) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Na pewno chcesz usunąć to stanowisko?',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteStation(station);
      },
      reject: () => {},
    });
  }

  onRowEditCancel(station: Station, index: number) {
    this.stations[index] = this.clonedStations[station.id.toString() as string];
    delete this.clonedStations[station.id.toString() as string];
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
