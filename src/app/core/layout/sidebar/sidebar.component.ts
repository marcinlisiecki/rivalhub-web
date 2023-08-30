import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  navBtnAnimation,
  navBtnAnimationMobile,
} from 'src/app/core/animations/sidebar-animation';
import { ViewService } from '@app/core/services/view/view.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { Subscription, filter } from 'rxjs';
import { SidebarService } from '@app/core/services/sidebar/sidebar.service';
import { Organization } from '@interfaces/organization/organization';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { UsersService } from '@app/core/services/users/users.service';
import { OrganizationSettings } from '@interfaces/organization/organization-settings';
import { ImageService } from '@app/core/services/image/image.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [navBtnAnimation, navBtnAnimationMobile],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = true;
  mobileViewSubscription?: Subscription;
  routerSubscription?: Subscription;
  authSubscription?: Subscription;
  mobileView!: boolean;
  isAccountActivated: boolean = false;
  canUserInvite: boolean = false;
  organizationViewId: number = -1;
  organizations: Organization[] = [];
  selectedOrganization: Organization | null = null;
  amIAdmin!: boolean;
  userName!: string;
  userId!: number;

  constructor(
    private viewService: ViewService,
    private authService: AuthService,
    private sidebarService: SidebarService,
    private router: Router,
    private organizationService: OrganizationsService,
    private usersService: UsersService,
    private imageService: ImageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.setSelectedOrganization();

    if (this.authService.isAuth()) {
      this.fetchOrganizations();
      this.fetchSettings();
    }

    this.authSubscription = this.authService
      .isAuthObservable()
      .subscribe((val: boolean) => {
        if (!val) {
          localStorage.removeItem('selectedOrganization');
          this.selectedOrganization = null;
        }

        this.isLoggedIn = val;

        if (!val) {
          return;
        }

        this.setSelectedOrganization();
        this.fetchOrganizations();
      });

    this.routerSubscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.sidebarService.isVisible && this.sidebarService.toggleSidebar();
        this.organizationViewId = this.sidebarService.isOrganizationView(e.url);
        if (
          this.organizationViewId !== -1 &&
          this.selectedOrganization?.id !== this.organizationViewId
        ) {
          this.organizationService.choose(this.organizationViewId).subscribe({
            next: (organization: Organization) => {
              this.selectOrganization(organization);
            },
          });
        }
      }
    });

    this.mobileView = this.viewService.mobileView;
    this.mobileViewSubscription = this.viewService.resizeSubject.subscribe(
      (value: boolean) => {
        this.mobileView = value;
      },
    );

    this.authService.isAuthObservable().subscribe((res) => {
      if (res) {
        this.usersService.getMe().subscribe((user: UserDetailsDto) => {
          this.isAccountActivated = user.activationTime !== null;
          this.userName = user.name;
          this.userId = user.id;
        });
      }
    });

    if (this.selectedOrganization) {
      this.amIAdmin = this.authService.amIAdmin(this.selectedOrganization.id);
    }
  }

  ngOnDestroy(): void {
    this.mobileViewSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }

  setSelectedOrganization() {
    if (localStorage.getItem('selectedOrganization')) {
      this.selectedOrganization = JSON.parse(
        localStorage.getItem('selectedOrganization') as string,
      );
    }
  }

  selectOrganization(organization: Organization) {
    localStorage.setItem('selectedOrganization', JSON.stringify(organization));
    this.selectedOrganization = organization;
    this.amIAdmin = this.authService.amIAdmin(this.selectedOrganization.id);
    this.fetchSettings();
  }

  fetchSettings() {
    if (this.selectedOrganization) {
      this.organizationService
        .getSettings(this.selectedOrganization.id)
        .subscribe({
          next: (settings: OrganizationSettings) => {
            this.canUserInvite = !settings.onlyAdminCanSeeInvitationLink;
          },
        });
    }
  }

  fetchOrganizations() {
    this.organizationService.getMy().subscribe({
      next: (organizations) => {
        organizations.forEach((organization) => {
          organization.imageUrl = this.imageService.getOrganizationImagePath(
            organization.imageUrl,
          );
        });

        this.organizations = organizations;
        //call method on each organization
      },
    });
  }

  isVisible() {
    return this.sidebarService.isVisible;
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.authService.logout();
    this.selectedOrganization = null;
  }

  public readonly checkDefaultAvatar = this.imageService.checkDefaultAvatar;
}
