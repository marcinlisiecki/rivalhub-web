import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { navAnimation } from '@app/core/animations/nav-animation';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ViewService } from '@app/core/services/view/view.service';
import { EventDto } from '@interfaces/event/event-dto';
import { Organization } from '@interfaces/organization/organization';
import { PagedResponse } from '@interfaces/generic/paged-response';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { Subscription } from 'rxjs';
import { Reservation } from '@interfaces/reservation/reservation';
import { MessageService } from 'primeng/api';
import { OrganizationSettings } from '@interfaces/organization/organization-settings';
import { AuthService } from '@app/core/services/auth/auth.service';
import { ImageService } from '@app/core/services/image/image.service';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss'],
  animations: [navAnimation],
})
export class OrganizationDashboardComponent implements OnInit, OnDestroy {
  navVisible: boolean = false;
  mobileView!: boolean;
  reservations: Reservation[] = [];
  events: EventDto[] = [];
  organization!: Organization;
  users!: UserDetailsDto[];
  id!: number;
  canUserInvite: boolean = false;

  amIAdmin!: boolean;

  resizeEventSub?: Subscription;
  paramsSub?: Subscription;

  constructor(
    private organizationsService: OrganizationsService,
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private messageService: MessageService,
    private authService: AuthService,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.mobileView = this.viewService.mobileView;
    this.resizeEventSub = this.viewService.resizeSubject.subscribe(
      (value: boolean) => {
        this.mobileView = value;
      },
    );

    this.paramsSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getOrganizationInfo();
      this.getOrganizationUsers();

      this.organizationsService.getSettings(this.id).subscribe({
        next: (settings: OrganizationSettings) => {
          this.canUserInvite = !settings.onlyAdminCanSeeInvitationLink;
        },
      });
    });

    const configured = this.route.snapshot.queryParams['configured'];
    if (configured) {
      this.messageService.add({
        severity: 'success',
        life: 1000 * 10,
        summary: 'Pomyślnie skonfigurowano organizację',
      });
      this.router
        .navigate([], {
          relativeTo: this.route,
          queryParams: {},
        })
        .then();
    }

    const inviteSuccess = this.route.snapshot.queryParams['invited']
    if (inviteSuccess) {
      this.messageService.add({
        severity: 'success',
        life: 1000 * 10,
        summary: 'Pomyślnie wysłano zaproszenie',
      });
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {}
      })
        .then()
    }

    this.amIAdmin = this.authService.amIAdmin(this.id);
    this.getOrganizationEvents();
  }

  ngOnDestroy(): void {
    this.resizeEventSub?.unsubscribe();
    this.paramsSub?.unsubscribe();
  }

  private getOrganizationInfo() {
    this.organizationsService.choose(this.id).subscribe({
      next: (res: Organization) => {
        this.organization = res;
        this.organization.imageUrl = this.imageService.getOrganizationImagePath(
          res.imageUrl,
        );
      },
      //Dodaj kiedyś obsługę błędów jak wpadniesz na fajny pomysł jak to zrobić
      error: (err: HttpErrorResponse) => {
        console.error('An error occurred:', err);
      },
    });
  }

  private getOrganizationEvents() {
    this.organizationsService.getEvents(this.id).subscribe({
      next: (res: EventDto[]) => {
        this.events = res;
      },
      error: (err: HttpErrorResponse) => {
        console.error('An error occurred:', err);
      },
    });
  }

  private getOrganizationUsers() {
    this.organizationsService.getUsers(this.id, 0, 5).subscribe({
      next: (res: PagedResponse<UserDetailsDto>) => {
        this.users = res.content;
      },
      //Dodaj kiedyś obsługę błędów jak wpadniesz na fajny pomysł jak to zrobić
      error: (err: HttpErrorResponse) => {
        console.error('An error occurred:', err);
      },
    });
  }

  toggleNav() {
    this.navVisible = !this.navVisible;
  }
}
