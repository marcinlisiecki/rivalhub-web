import {
  effect,
  EffectRef,
  Inject,
  Injectable,
  LOCALE_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { Calendar, CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import allLocales from '@fullcalendar/core/locales-all';
import { LanguageService } from '@app/core/services/language/language.service';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { Organization } from '@interfaces/organization/organization';
import { formatDate } from '@angular/common';
import { CalendarEvent } from '@interfaces/calendar/calendar-event';
import { EventDto } from '@interfaces/event/event-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import { Filters } from '@app/features/calendar/calendar-filter/calendar-filter.component';
import { forkJoin, lastValueFrom, Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  organizationReservation: WritableSignal<
    { organization: Organization; reservation: Reservation }[]
  > = signal([]);
  organizationEvents: WritableSignal<EventDto[]> = signal([]);
  api!: Calendar;

  currentDate = signal(new Date());
  allEvents = signal<CalendarEvent[]>([]);
  visibleEvents = signal(this.allEvents());
  currentDayEvents = signal(this.allEvents());
  organizations: WritableSignal<Organization[]> = signal([]);
  currentWeekends = signal(true);
  sidebar = signal(false);
  private language = this.languageService.getCurrentLanguage();
  options = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    eventDisplay: 'block',
    showNonCurrentDates: true,
    initialView: 'dayGridMonth',
    events: this.visibleEvents(),
    eventSources: this.visibleEvents(),
    editable: false,
    selectMirror: false,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    displayEventTime: true,
    firstDay: 1,
    locales: allLocales,
    locale: 'pl',
  });
  langChangeEffect: EffectRef;
  calendarEventsSub!: Subscription;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private languageService: LanguageService,
    private organizationsService: OrganizationsService,
    private authService: AuthService,
    private http: HttpClient,
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
      localStorage.setItem('showWeekends', String(Number(options.weekends)));
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.currentDate.set(selectInfo.start);
    this.updateCalendar();
  }

  setCalendarApi(_api: Calendar) {
    this.api = _api;
  }

  currentFilter(filers: Filters) {
    let currentTypes = filers.selectedTypes;
    let currentorganizations = filers.selectedorganizations;

    let tempEventArray: CalendarEvent[] = [];
    for (let event of this.allEvents()) {
      if (currentTypes.includes(event['typeId'])) {
        if (currentorganizations.includes(event['organizationId']))
          tempEventArray.push(event);
      }
    }
    this.visibleEvents.set(tempEventArray);
    this.updateCalendar();
  }

  currentDayFilter(currentDay: string | Date) {
    currentDay = formatDate(currentDay, 'yyyy-MM-dd', this.locale);
    this.currentDayEvents.set(
      this.searchEvents([currentDay], 'startStr', this.visibleEvents()),
    );
  }

  async getorganization() {
    try {
      const organizations: any[] = await Promise.all(
        await lastValueFrom(this.organizationsService.getMy()),
      );
      this.organizations.set(organizations);
    } catch (err) {
      console.error(err, 'wystąpił błąd');
    }
  }

  setLocalStorage() {
    let local: string | null = localStorage.getItem('showWeekends');
    if (local === null) {
      localStorage.setItem('showWeekends', String(1));
      local = '1';
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

  // async getEvents() {
  //   let events: EventDto[] = [];
  //   let reservations: any[] = [];
  //   await this.getorganization();
  //
  //   for (let organization of this.organizations()) {
  //     try {
  //       const [eventsResult, reservationsResult] = await Promise.all([
  //         await lastValueFrom(
  //           this.organizationsService.getEvents(organization.id),
  //         ),
  //         await lastValueFrom(
  //           this.organizationsService.getOrganizationReservations(
  //             this.authService.getUserId() as number,
  //           ),
  //         ),
  //       ]);
  //
  //       events.push(...eventsResult);
  //       reservations.push(
  //         ...reservationsResult.map((reservation) => ({
  //           organization,
  //           reservation,
  //         })),
  //       );
  //     } catch (err) {
  //       console.error('An error occurred:', err);
  //     }
  //   }
  //
  //   this.organizationEvents.set(events);
  //   this.organizationReservation.set(reservations);
  // }

  getMonthEvents(month: string) {
    let temp: any[] = [];
    let sources = [
      this.http.get<EventDto[]>(
        environment.apiUrl + `/users/events?date=${month}`,
      ),
      this.http.get<Reservation[]>(
        environment.apiUrl + `/users/reservations?date=${month}`,
      ),
    ];

    this.calendarEventsSub = forkJoin(sources).subscribe(
      ([events, reservations]) => {
        let tempID: number[] = [];

        events = <EventDto[]>events;
        events.forEach((event) => {
          //tymczasowy fikołek dopóki endpoint nie zostanie naprawiony
          if (!tempID.includes(event.eventId)) {
            temp.push(this.createEvent(event));
            tempID.push(event.eventId);
          }
        });

        reservations = <Reservation[]>reservations;
        reservations.forEach((reservation) => {
          temp.push(this.createReservation(reservation));
        });
        this.allEvents.set(temp);
        this.visibleEvents.set(temp);
        this.updateCalendar();
      },
    );
  }

  private createEvent(eventData: EventDto) {
    let color = eventData.organization.color;
    let orgName = eventData.organization.name;
    let type = 'event';
    let orgId = eventData.organization.id.toString();
    let newEvent: CalendarEvent = {
      organizationId: orgId,
      organizationName: orgName,
      type: type,
      typeId: '1',
      title: eventData.name,
      startStr: eventData.startTime.toString(),
      start: eventData.startTime,
      endStr: eventData.endTime.toString(),
      end: eventData.endTime,
      allDay: false,
      borderColor: color,
      color: eventData.organization.color,
      extendedProps: {
        organizationName: eventData.organization.name,
        organizationId: eventData.organization.id.toString(),
        type: eventData.eventType,
        backgroundColor: eventData.organization.color,
        description: eventData.description,
      },
    };

    return newEvent;
  }

  private createReservation(res: Reservation) {
    let orgId = res.organization.id.toString();
    let orgName = res.organization.name;
    let type = 'reservation';
    let newReservation: CalendarEvent = {
      organizationId: orgId,
      organizationName: orgName,
      type: type,
      typeId: '2',
      title: 'rezerwacja', //eventData.name,
      startStr: res.startTime.toString(),
      start: res.startTime,
      endStr: res.endTime.toString(),
      end: res.endTime,
      color: '#367790',
      allDay: false,
      borderColor: res.organization.color,
      extendedProps: {
        organizationName: orgName,
        organizationId: orgId,
        type: 'reservation',
        backgroundColor: '#367790',
        //description:eventData.description
      },
    };
    return newReservation;
  }
}
