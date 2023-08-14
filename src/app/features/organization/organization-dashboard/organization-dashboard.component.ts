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
  events: EventDto[] = [
    {
      id: 1,
      name: 'Wędkowanie na jeziorze',
      place: 'Jezioro',
      startTime: new Date('2023-09-13T11:11'),
      endTime: new Date('2023-09-14T11:11'),
      participantIds: [5],
    },
    {
      id: 2,
      name: 'Wędkowanie na rzece',
      place: 'Rzeka',
      startTime: new Date('2023-09-13T11:11'),
      endTime: new Date('2023-09-14T11:11'),
      participantIds: [1, 2],
    },
    {
      id: 3,
      name: 'Wędkowanie na stawie',
      place: 'Staw',
      startTime: new Date('2023-09-13T11:11'),
      endTime: new Date('2023-09-14T11:11'),
      participantIds: [2, 3, 4],
    },
  ];
  organization!: Organization;
  users!: UserDetailsDto[];
  id!: number;

  resizeEventSub?: Subscription;
  paramsSub?: Subscription;

  constructor(
    private organizationsService: OrganizationsService,
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private messageService: MessageService,
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
    });

    this.getOrganizationInfo();
    this.getOrganizationUsers();
    this.getOrganizationReservations();

    const configured = this.route.snapshot.queryParams['configured'];
    if (configured) {
      this.messageService.add({
        severity: 'success',
        life: 1000 * 10,
        summary: 'Pomyślnie skonfigurowao organizację',
      });
      this.router
        .navigate([], {
          relativeTo: this.route,
          queryParams: {},
        })
        .then();
    }

    // this.getOrgzationEvents();
  }

  getOrganizationReservations() {
    this.organizationsService.getOrganizationReservations(this.id).subscribe({
      next: (res: Reservation[]) => {
        // Only temporarily TODO
        const alreadyAdded: number[] = [];

        for (const reservation of res) {
          if (alreadyAdded.includes(reservation.id)) {
            continue;
          }

          alreadyAdded.push(reservation.id);
          this.reservations.push(reservation);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.resizeEventSub?.unsubscribe();
    this.paramsSub?.unsubscribe();
  }

  private getOrganizationInfo() {
    this.organizationsService.choose(this.id).subscribe({
      next: (res: Organization) => {
        this.organization = res;
        this.organization.imageUrl = this.getImagePath(res.imageUrl);
      },
      //Dodaj kiedyś obsługę błędów jak wpadniesz na fajny pomysł jak to zrobić
      error: (err: HttpErrorResponse) => {
        console.error('An error occurred:', err);
      },
    });
  }

  private getOrgzationEvents() {
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

  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return imageUrl;
    }

    return 'assets/img/avatars/avatarplaceholder.png';
  }

  toggleNav() {
    this.navVisible = !this.navVisible;
  }
}
