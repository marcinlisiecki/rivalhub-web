import { Component, Input } from '@angular/core';

import { Organization } from '@interfaces/organization/organization';
import {environment} from "../../../../../environments/enviroment";
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent {
  @Input({ required: true })
  organization!: Organization;

  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return environment.apiUrl + "/" + imageUrl;
    }

    return 'assets/img/avatars/avatarplaceholder.png';
  }
}
