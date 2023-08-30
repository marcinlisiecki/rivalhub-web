import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '@app/core/services/events/events.service';
import { EventDto } from '@interfaces/event/event-dto';
import { EventType } from '@interfaces/event/event-type';
import { extractMessage } from '@app/core/utils/apiErrors';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorsService } from '@app/core/services/errors/errors.service';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { EventCategoryFilter } from '@interfaces/event/filter/event-category-filter';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { LanguageService } from '@app/core/services/language/language.service';
import { EventStatusFilter } from '@interfaces/event/filter/event-status-filter';
import { EVENT_STATUS_FILTER } from '@app/core/constants/event-status-filter';
import { Subscription } from 'rxjs';
import { LangChangeEvent } from '@ngx-translate/core';
import { getStatusFilterLabels } from '@app/core/utils/filters/getStatusFilterLabels';
import { getCategoryFilterLabels } from '@app/core/utils/filters/getCategoryFilterLabels';

@Component({
  selector: 'app-view-organization-events',
  templateUrl: './view-organization-events.component.html',
  styleUrls: ['./view-organization-events.component.scss'],
})
export class ViewOrganizationEventsComponent
  implements OnInit, OnChanges, OnDestroy
{
  events: EventDto[] = [];
  organizationId!: number;

  eventTypesFilter: EventCategoryFilter[] = [];
  eventStatusFilter: EventStatusFilter[] = EVENT_STATUS_FILTER;

  eventTypes: EventType[] = [];
  selectedEventTypeFilter?: EventCategoryFilter;
  selectedEventStatusFilter: EventStatusFilter = EVENT_STATUS_FILTER[1];

  filteredEvents: EventDto[] = [];
  paginatedEvents: EventDto[] = [];
  onlyMyEvents: boolean = false;

  first: number = 0;
  rows: number = 5;

  languageSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private errorsService: ErrorsService,
    private organizationsService: OrganizationsService,
    private eventsService: EventsService,
    private authService: AuthService,
    private messageService: MessageService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.organizationId = params['id'];
      this.getOrganizationEvents().then();
      this.fetchActiveEventTypes(this.organizationId);
    });

    setTimeout(() => this.setStatusFilterLabels(), 100);

    this.languageSub = this.languageService.onLangChange.subscribe(() => {
      this.setCategoryFilterLabels();
      this.setStatusFilterLabels();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events']) {
      this.filterEvents();
    }
  }

  ngOnDestroy(): void {
    this.languageSub?.unsubscribe();
  }

  joinEvent(event: EventDto) {
    this.eventsService.joinEvent(event.eventId, event.eventType).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          life: 3 * 1000,
          detail: 'Dołączyłeś do wydarzenia.',
        });
        event.participants.push(this.authService.getUserId()!);
      },
    });
  }

  canJoin(event: EventDto): boolean {
    return (
      event.eventPublic &&
      !event.participants.includes(this.authService.getUserId()!)
    );
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.setPaginatedEvents();
  }

  setPaginatedEvents() {
    this.paginatedEvents = this.filteredEvents.slice(
      this.first,
      this.first + this.rows,
    );
  }

  filterEvents() {
    this.first = 0;
    let tempEvents: EventDto[] = this.events;
    const userId = this.authService.getUserId();

    if (this.onlyMyEvents && userId) {
      tempEvents = tempEvents.filter((event) =>
        event.participants.includes(userId),
      );
    }

    if (this.selectedEventTypeFilter?.value !== 'ALL') {
      tempEvents = tempEvents.filter(
        (event) => event.eventType === this.selectedEventTypeFilter?.value,
      );
    }

    if (this.selectedEventStatusFilter?.status !== 'ALL') {
      if (this.selectedEventStatusFilter.status === 'NotHistorical') {
        tempEvents = tempEvents.filter(
          (event) => event.status !== 'Historical',
        );
      } else {
        tempEvents = tempEvents.filter(
          (event) => event.status === this.selectedEventStatusFilter?.status,
        );
      }
    }

    this.filteredEvents = tempEvents;
    this.setPaginatedEvents();
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
      this.events = this.getSortedEvents(tempEvents);
      this.filterEvents();
    }
  }

  private getSortedEvents(events: EventDto[]) {
    return events.sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    );
  }

  private setStatusFilterLabels() {
    this.eventStatusFilter = getStatusFilterLabels(this.languageService);
  }

  private setCategoryFilterLabels() {
    this.eventTypesFilter = getCategoryFilterLabels(
      this.languageService,
      this.eventTypes,
    );

    this.selectedEventTypeFilter = {
      name: this.languageService.instant(
        'organization.dashboard.events.categoriesFilter.all',
      ),
      value: 'ALL',
    };
  }

  fetchActiveEventTypes(organizationId: number) {
    this.eventsService.getEventTypesInOrganization(organizationId).subscribe({
      next: (eventTypes: EventType[]) => {
        this.eventTypes = eventTypes;
        this.setCategoryFilterLabels();
      },
    });
  }

  async fetchEventsForType(type: EventType) {
    return new Promise<EventDto[]>((resolve, reject) => {
      this.organizationsService.getEvents(this.organizationId, type).subscribe({
        next: (events: EventDto[]) => {
          resolve(events);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }
}
