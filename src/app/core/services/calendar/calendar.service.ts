import {
  effect,
  EffectRef,
  Inject,
  Injectable,
  LOCALE_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  Calendar,
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS } from '@app/mock/calendar';
import allLocales from '@fullcalendar/core/locales-all';
import { LanguageService } from '@app/core/services/language/language.service';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { Organization } from '@interfaces/organization/organization';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { CalendarEvent } from '@interfaces/calendar/calendar-event';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  api!: Calendar;
  selectedDate!: WritableSignal<DateClickArg>;
  currentDate = signal(new Date());
  allEvents = signal<CalendarEvent[]>(INITIAL_EVENTS);
  visibleEvents = signal(this.allEvents());
  currentDayEvents = signal(this.allEvents());
  organisations: WritableSignal<Organization[]> = signal([]);
  currentWeekends = signal(true);
  langChangeEffect: EffectRef;

  sidebar = signal(false);
  language = this.lang.getCurrentLanguage();
  events = signal<CalendarEvent[]>([]);
  options = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    eventDisplay: 'block',
    showNonCurrentDates: true,
    initialView: 'dayGridMonth',
    events: this.visibleEvents(),
    eventSources: this.visibleEvents(),
    weekends: true,
    editable: false,
    selectMirror: false,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    displayEventTime: true,
    firstDay: 1,
    locales: allLocales,
    locale: 'pl',
    /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
  });
  public filter: { selectedOrganisations: Array<string> } = {
    selectedOrganisations: [],
  };

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private lang: LanguageService,
    private orgServ: OrganizationsService,
  ) {
    this.langChangeEffect = effect(
      () => {
        this.options.mutate((options) => {
          options.locale = this.language();
        });
      },
      { allowSignalWrites: true },
    );
  }

  handleWeekendsToggle() {
    this.options.mutate((options) => {
      options.weekends = !options.weekends;
      localStorage.setItem('showWeekends', String(options.weekends));
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.updateCalendar();
    this.currentDate.set(selectInfo.start);
  }

  setCalendarApi(_api: Calendar) {
    this.api = _api;
  }

  currentDayFilter(currentDay: string | Date) {
    currentDay = formatDate(currentDay, 'yyyy-MM-dd', this.locale);
    this.currentDayEvents.set(
      this.searchEvents([currentDay], 'startStr', this.visibleEvents()),
    );
  }

  currentOrganisationsFilter(currentOrganisations: string[]) {
    if (!this.organisations()[0]) {
      this.getOrganisation();
      if (!this.organisations()[0]) {
        console.error('brak organizaci');
        return;
      }
    }
    this.visibleEvents.set(
      this.searchEvents(
        currentOrganisations,
        'organisationId',
        this.allEvents(),
      ),
    );
    this.updateCalendar();
  }

  currentTypeFilter(currentTypes: string[]) {
    this.visibleEvents.set(
      this.searchEvents(currentTypes, 'typeId', this.allEvents()),
    );
    this.updateCalendar();
  }

  getOrganisation() {
    let sub = this.orgServ.getMy().subscribe({
      next: (res: Organization[]) => {
        this.organisations.set(res);
      },
      //Dodaj kiedyś obsługę błędów jak wpadniesz na fajny pomysł jak to zrobić
      error: (err: HttpErrorResponse) => {
        console.error('An error occurred:', err);
      },
    });
    sub.unsubscribe();
  }

  setLocalStorage() {
    let local: string | null = localStorage.getItem('showWeekends');
    if (local === null) {
      localStorage.setItem('showWeekends', String(true));
    }
    this.currentWeekends.set(Boolean(local));
    this.options.mutate((options) => {
      options.weekends = this.currentWeekends();
    });
  }

  private searchEvents(arg: any[], str: string, _this: any[]): CalendarEvent[] {
    let tempEventArray: CalendarEvent[] = [];
    for (let event of _this) {
      if (arg.includes(event[str].slice(0, 10))) {
        tempEventArray.push(event);
      }
    }
    return tempEventArray;
  }

  updateCalendar() {
    this.api.removeAllEvents();
    this.api.removeAllEventSources();
    this.api.addEventSource(this.visibleEvents());
    this.currentDayFilter(this.currentDate());
  }
}
