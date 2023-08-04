import { Component, OnInit } from '@angular/core';
import { Station } from '@interfaces/Station';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { ActivatedRoute } from '@angular/router';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { extractMessage } from '@app/core/utils/apiErrors';

@Component({
  selector: 'app-view-stations',
  templateUrl: './view-stations.component.html',
  styleUrls: ['./view-stations.component.scss'],
})
export class ViewStationsComponent implements OnInit {
  stations: Station[] = [];
  organizationId!: number;
  apiError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationsService,
  ) {
    this.route.params.subscribe((params) => {
      this.organizationId = params['id'];
    });
  }

  ngOnInit(): void {
    this.organizationService
      .getOrganizationStations(this.organizationId)
      .subscribe({
        next: (res: Station[]) => {
          this.stations = res;
        },
        error: (err: unknown) => {
          this.apiError = extractMessage(err);
        },
      });
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
