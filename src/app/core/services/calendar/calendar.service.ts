import {
  effect,
  EffectRef,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  Calendar,
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
} from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS } from '@app/features/calendar/calendar-body/event-utils';
import allLocales from '@fullcalendar/core/locales-all';
import { LanguageService } from '@app/core/services/language/language.service';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { Organization } from '@interfaces/organization/organization';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  organisations: WritableSignal<Organization[]> = signal([]);
  currentDayEvents = signal<EventApi[]>([]);
  currentWeekends = signal(true);
  langChangeEffect: EffectRef;
  sidebar = signal(false);
  language = this.lang.getCurrentLanguage();
  events = signal<EventApi[]>([]);
  api!: Calendar;
  options = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS,
    events: [this.events],
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    dateClick: this.handleDateClick.bind(this),
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
    // const title = selectInfo.startStr.slice(0, 4);
    // const calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection
    // if (!title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr + 'T18:54:14',
    //     end: selectInfo.startStr + 'T19:54:14',
    //     extendedProps: {
    //       organisation: 'NCDC',
    //     },
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg) {
    alert(clickInfo.event.title);
  }

  handleDateClick(arg: DateClickArg) {
    this.currentDayFilter(arg.dateStr);
    alert('Data: ' + arg.dateStr);
  }

  handleEvents(events: EventApi[]) {
    setTimeout(() => {
      this.events.set(events);
    }, 0); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  setCalendarApi(_api: Calendar) {
    this.api = _api;
  }

  currentDayFilter(currentDay: string) {
    this.currentDayEvents.set([]);
    for (let event of this.events()) {
      if (event.startStr.slice(0, 10) == currentDay) {
        this.currentDayEvents.mutate((ev) => ev.push(event));
      }
    }
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
}
