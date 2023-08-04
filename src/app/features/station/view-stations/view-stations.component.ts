import { Component } from '@angular/core';
import { Station } from '@interfaces/Station';
import { STATIONS } from '@app/mock/stations';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-stations',
  templateUrl: './view-stations.component.html',
  styleUrls: ['./view-stations.component.scss'],
})
export class ViewStationsComponent {
  stations: Station[] = STATIONS;
  organizationId!: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.organizationId = params['id'];
    });
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
