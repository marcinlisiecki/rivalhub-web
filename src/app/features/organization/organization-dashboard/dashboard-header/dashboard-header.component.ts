import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '@app/core/services/image/image.service';

import { Organization } from '@interfaces/organization/organization';
import { environment } from '../../../../../environments/enviroment';
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  @Input({ required: true })
  organization!: Organization;
  defaultAvatar!: boolean;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.defaultAvatar = this.imageService.checkDefaultAvatar(
      this.organization.imageUrl,
    );
  }
}
