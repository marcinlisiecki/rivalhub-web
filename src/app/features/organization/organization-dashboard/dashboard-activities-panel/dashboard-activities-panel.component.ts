import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { Reservation } from '@interfaces/reservation/reservation';
import { EventDto } from '@interfaces/event/event-dto';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { EventsService } from '@app/core/services/events/events.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '@app/core/services/auth/auth.service';
import { EventType } from '@interfaces/event/event-type';
import { LanguageService } from '@app/core/services/language/language.service';
import { EventCategoryFilter } from '@interfaces/event/filter/event-category-filter';
import { getCategoryFilterLabels } from '@app/core/utils/filters/getCategoryFilterLabels';

@Component({
  selector: 'app-dashboard-activities-panel',
  templateUrl: './dashboard-activities-panel.component.html',
  styleUrls: ['./dashboard-activities-panel.component.scss'],
})
export class DashboardActivitiesPanelComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input({ required: true }) reservations!: Reservation[];
  @Input({ required: true }) events!: EventDto[];

  organizationId!: number;
  paramsSubscription?: Subscription;
  toastLifeTime: number = 3 * 1000;

  eventTypes: EventType[] = [];
  eventTypesFilter: EventCategoryFilter[] = [];
  selectedFilter?: EventCategoryFilter;
  filteredEvents: EventDto[] = [];
  paginatedEvents: EventDto[] = [];

  first: number = 0;
  rows: number = 5;

  languageSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private messageService: MessageService,
    private authService: AuthService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe({
      next: (params: Params) => {
        this.organizationId = params['id'];
        this.fetchActiveEventTypes(this.organizationId);
      },
    });

    this.languageSub = this.languageService.onLangChange.subscribe(() => {
      this.setCategoryFilterLabels();
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

  joinEvent(event: EventDto) {
    this.eventsService.joinEvent(event.eventId, event.eventType).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          life: this.toastLifeTime,
          detail: this.languageService.instant('organization.eventJoin'),
        });
        event.participants.push(this.authService.getUserId()!);
      },
    });
  }

  filterEvents() {
    this.first = 0;

    if (this.selectedFilter?.value === 'ALL' || !this.selectedFilter) {
      this.filteredEvents = this.events;
      this.setPaginatedEvents();

      return;
    }

    this.filteredEvents = this.events.filter(
      (event) => event.eventType === this.selectedFilter?.value,
    );

    this.setPaginatedEvents();
  }

  canJoin(event: EventDto): boolean {
    return (
      event.eventPublic &&
      !event.participants.includes(this.authService.getUserId()!)
    );
  }

  private setCategoryFilterLabels() {
    this.eventTypesFilter = getCategoryFilterLabels(
      this.languageService,
      this.eventTypes,
    );

    this.selectedFilter = {
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

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
