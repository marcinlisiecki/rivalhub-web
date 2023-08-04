import { Component, HostListener } from '@angular/core';
import { UserDto } from '@interfaces/UserDto';
import { Organization } from '@interfaces/Organization';
import { EventDto } from '@app/core/interfaces/EventDto';
import { navAnimation } from '@app/core/animations/nav-animation';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss'],
  animations: [navAnimation],
})
export class OrganizationDashboardComponent {
  navVisible: boolean = false;
  mobileView: boolean = window.innerWidth <= 768 ? true : false;
  events!: EventDto[];
  organization!: Organization;
  users!: UserDto[];
  id!: number;

  constructor(
    private organizationsService: OrganizationsService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.organizationsService.choose(this.id).subscribe({
      next: (res: Organization) => {
        this.organization = res;
        this.organization.imageUrl = this.getImagePath(res.imageUrl);
      },
    });
  }

  toggleNav() {
    this.navVisible = !this.navVisible;
  }
  //update mobileView on window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobileView = event.target.innerWidth <= 768;
  }

  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return imageUrl;
    }

    return 'assets/img/avatars/avatarplaceholder.png';
  }
}
