import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  navBtnAnimation,
  navBtnAnimationMobile,
} from 'src/app/core/animations/sidebar-animation';
import { ViewService } from '@app/core/services/view/view.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { Subscription } from 'rxjs';
import { SidebarService } from '@app/core/services/sidebar/sidebar.service';
import { Organization } from '@interfaces/organization/organization';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [navBtnAnimation, navBtnAnimationMobile],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = true;
  mobileViewSubscription?: Subscription;
  mobileView!: boolean;

  user: UserDetailsDto = {
    id: 0,
    name: 'Dominik Matuszewski',
    email: 'zippek@edu.pl',
    profilePictureUrl: 'https://i.imgur.com/1qB7B9F.png',
    activationTime: null,
  };

  organizations: Organization[] = [];
  selectedOrganization: Organization | null = null;

  constructor(
    private viewService: ViewService,
    private authService: AuthService,
    private sidebarService: SidebarService,
    private organizationService: OrganizationsService,
  ) {
    this.fetchOrganizations();

    if (localStorage.getItem('selectedOrganization')) {
      this.selectedOrganization = JSON.parse(
        localStorage.getItem('selectedOrganization') as string,
      );
    }
  }

  selectOrganization(organization: Organization) {
    localStorage.setItem('selectedOrganization', JSON.stringify(organization));
    this.selectedOrganization = organization;
  }

  fetchOrganizations() {
    this.organizationService.getMy().subscribe({
      next: (organizations) => {
        this.organizations = organizations;
      },
    });
  }

  isVisible() {
    return this.sidebarService.isVisible;
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnDestroy(): void {
    this.mobileViewSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.authService.isAuthObservable().subscribe((val: boolean) => {
      this.isLoggedIn = val;
    });

    this.mobileView = this.viewService.mobileView;
    this.mobileViewSubscription = this.viewService.resizeSubject.subscribe(
      (value: boolean) => {
        this.mobileView = value;
      },
    );
  }

  logout() {
    this.authService.logout();
  }
}
