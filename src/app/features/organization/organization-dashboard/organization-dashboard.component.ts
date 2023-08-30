import { Component, OnDestroy, OnInit } from '@angular/core';
import { navAnimation } from '@app/core/animations/nav-animation';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
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
import { EventType } from '@interfaces/event/event-type';
import { ErrorsService } from '@app/core/services/errors/errors.service';
import { extractMessage } from '@app/core/utils/apiErrors';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss'],
  animations: [navAnimation],
})
export class OrganizationDashboardComponent implements OnInit, OnDestroy {
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
    private errorsService: ErrorsService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.handleRWD();

    this.paramsSub = this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.getOrganizationInfo();
      this.getOrganizationUsers();
      this.fetchSettings();
      this.getOrganizationEvents().then();
    });

    this.handleConfigured();
    this.handleInvitation();

    this.amIAdmin = this.authService.amIAdmin(this.id);
  }

  ngOnDestroy(): void {
    this.resizeEventSub?.unsubscribe();
    this.paramsSub?.unsubscribe();
  }

  private handleRWD() {
    this.mobileView = this.viewService.mobileView;
    this.resizeEventSub = this.viewService.resizeSubject.subscribe(
      (value: boolean) => {
        this.mobileView = value;
      },
    );
  }

  private fetchSettings() {
    this.organizationsService.getSettings(this.id).subscribe({
      next: (settings: OrganizationSettings) => {
        this.canUserInvite = !settings.onlyAdminCanSeeInvitationLink;
      },
    });
  }

  private handleConfigured() {
    const configured = this.route.snapshot.queryParams['configured'];
    if (configured) {
      this.messageService.add({
        severity: 'success',
        life: 1000 * 10,
        summary: this.languageService.instant('organization.configured'),
      });
      this.router
        .navigate([], {
          relativeTo: this.route,
          queryParams: {},
        })
        .then();
    }
  }

  private handleInvitation() {
    const inviteSuccess = this.route.snapshot.queryParams['invited'];
    if (inviteSuccess) {
      this.messageService.add({
        severity: 'success',
        life: 1000 * 10,
        summary: this.languageService.instant('organization.invitationSended'),
      });
      this.router
        .navigate([], {
          relativeTo: this.route,
          queryParams: {},
        })
        .then();
    }
  }

  private getOrganizationInfo() {
    this.organizationsService.choose(this.id).subscribe({
      next: (res: Organization) => {
        this.organization = res;
        this.organization.imageUrl = this.imageService.getOrganizationImagePath(
          res.imageUrl,
        );
      },
      error: (err: HttpErrorResponse) => {
        this.errorsService.createErrorMessage(extractMessage(err));
      },
    });
  }

  private async getOrganizationEvents() {
    const tempEvents: EventDto[] = [];

    try {
      tempEvents.push(...(await this.fetchEventsForType(EventType.PING_PONG)));
      tempEvents.push(
        ...(await this.fetchEventsForType(EventType.TABLE_FOOTBALL)),
      );
      tempEvents.push(...(await this.fetchEventsForType(EventType.PULL_UPS)));
      tempEvents.push(...(await this.fetchEventsForType(EventType.BILLIARDS)));
      tempEvents.push(...(await this.fetchEventsForType(EventType.DARTS)));
    } catch (err: unknown) {
      this.errorsService.createErrorMessage(extractMessage(err));
    } finally {
      this.events = this.filterIncomingAndActiveEvents(tempEvents);
    }
  }

  private filterIncomingAndActiveEvents(events: EventDto[]) {
    return events
      .filter(
        (event) => event.status === 'Active' || event.status === 'Incoming',
      )
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      );
  }

  async fetchEventsForType(type: EventType) {
    return new Promise<EventDto[]>((resolve, reject) => {
      this.organizationsService.getEvents(this.id, type).subscribe({
        next: (events: EventDto[]) => {
          resolve(events);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  private getOrganizationUsers() {
    this.organizationsService.getUsers(this.id, 0, 5).subscribe({
      next: (res: PagedResponse<UserDetailsDto>) => {
        this.users = res.content;
      },
      error: (err: HttpErrorResponse) => {
        this.errorsService.createErrorMessage(extractMessage(err));
      },
    });
  }
}
