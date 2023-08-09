import { Component, OnInit } from '@angular/core';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { ActivatedRoute } from '@angular/router';
import { extractMessage } from '@app/core/utils/apiErrors';
import { EditStation } from '@app/core/interfaces/station/edit-station';
import { StationsService } from '@app/core/services/stations/stations.service';

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

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
