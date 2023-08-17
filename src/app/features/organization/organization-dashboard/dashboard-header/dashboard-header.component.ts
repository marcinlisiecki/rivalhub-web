import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ImageService } from '@app/core/services/image/image.service';

import { Organization } from '@interfaces/organization/organization';
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent {
  @Input({ required: true })
  organization!: Organization;

  organizationImg: string = this.imageService.getImagePath(
    this.organization.imageUrl,
  );

  constructor(private imageService: ImageService) {}
}
