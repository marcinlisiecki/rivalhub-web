import { Component } from '@angular/core';
import { Organization } from 'src/app/core/interfaces/Organization';
import { OrganizationsService } from '../../../core/services/organizations/organizations.service';

@Component({
  selector: 'app-my-organizations',
  templateUrl: './my-organizations.component.html',
  styleUrls: ['./my-organizations.component.scss'],
})
export class MyOrganizationsComponent {
  organizations: Organization[] = [];

  constructor(private organizationsService: OrganizationsService) {
    this.organizationsService.getMy().subscribe({
      next: (res: Organization[]) => {
        this.organizations = res;
      },
    });
  }

  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return imageUrl;
    }

    return 'assets/img/avatars/avatarplaceholder.png';
  }

  createURL(id: number): string {
    return `/organizations/${id}`;
  }

  isDefaultAvatar(imageUrl: string | null): boolean {
    return imageUrl === null;
  }

  displayName(name: string): string {
    return name.length > 20 ? name.slice(0, 20) + '...' : name;
  }
}
