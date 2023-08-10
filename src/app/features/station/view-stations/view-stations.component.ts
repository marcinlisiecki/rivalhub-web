import { Component, OnInit } from '@angular/core';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { ActivatedRoute } from '@angular/router';
import { extractMessage } from '@app/core/utils/apiErrors';
import { EditStation } from '@app/core/interfaces/station/edit-station';
import { StationsService } from '@app/core/services/stations/stations.service';
import { EventType } from '@interfaces/event/event-type';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-stations',
  templateUrl: './view-stations.component.html',
  styleUrls: ['./view-stations.component.scss'],
})
export class ViewStationsComponent implements OnInit {
  stations: EditStation[] = [];
  organizationId!: number;
  apiError: string | null = null;
  edit: boolean = false;

  clonedStations: { [s: string]: EditStation } = {};

  stationTypes: any = Object.keys(EventType);

  constructor(
    private route: ActivatedRoute,
    private stationsService: StationsService,
  ) {
    this.route.params.subscribe((params) => {
      this.organizationId = params['id'];
    });
  }

  ngOnInit(): void {
    this.stationsService
      .getOrganizationEditStations(this.organizationId)
      .subscribe({
        next: (res: EditStation[]) => {
          this.stations = res;
        },
        error: (err: unknown) => {
          this.apiError = extractMessage(err);
        },
      });
  }

  editStation(station: EditStation): void {
    this.stationsService.updateStation(this.organizationId, station).subscribe({
      next: () => {},
      error: (err: unknown) => {
        this.apiError = extractMessage(err);
      },
    });
  }

  onRowEditInit(station: EditStation) {
    this.clonedStations[station.id.toString() as string] = { ...station };
  }

  onRowEditSave(station: EditStation) {
    console.log(station);
    this.editStation(station);
  }

  onRowEditCancel(station: EditStation, index: number) {
    this.stations[index] = this.clonedStations[station.id.toString() as string];
    delete this.clonedStations[station.id.toString() as string];
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
