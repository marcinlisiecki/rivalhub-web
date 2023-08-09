import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../../../core/services/organizations/organizations.service';
import { Organization } from '@interfaces/organization/organization';

@Component({
  selector: 'app-my-organizations',
  templateUrl: './my-organizations.component.html',
  styleUrls: ['./my-organizations.component.scss'],
})
export class MyOrganizationsComponent implements OnInit {
  organizations: Organization[] = [];
  isDefaultAvatar!: boolean;
  constructor(private organizationsService: OrganizationsService) {}

  ngOnInit(): void {
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

  checkDefaultAvatar(imageUrl: string | null) {
    this.isDefaultAvatar = imageUrl === null ? true : false;
  }

  displayName(name: string): string {
    return name.length > 20 ? name.slice(0, 20) + '...' : name;
  }
}