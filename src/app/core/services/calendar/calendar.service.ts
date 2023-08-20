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
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { CalendarEvent } from '@interfaces/calendar/calendar-event';
import { EventDto } from '@interfaces/event/event-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import { Filters } from '@app/features/calendar/calendar-filter/calendar-filter.component';
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  organisationReservation: WritableSignal<
    { organisation: Organization; reservation: Reservation }[]
  > = signal([]);
  organisationEvents: WritableSignal<EventDto[]> = signal([]);
  api!: Calendar;

  currentDate = signal(new Date());
  allEvents = signal<CalendarEvent[]>([]);
  visibleEvents = signal(this.allEvents());
  currentDayEvents = signal(this.allEvents());
  organisations: WritableSignal<Organization[]> = signal([]);
  currentWeekends = signal(true);
  sidebar = signal(false);
  private language = this.lang.getCurrentLanguage();

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
  });
  langChangeEffect: EffectRef;

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
    this.currentDate.set(selectInfo.start);
    this.updateCalendar();
  }

  setCalendarApi(_api: Calendar) {
    this.api = _api;
  }

  currentFilter(filers: Filters) {
    let currentTypes = filers.selectedTypes;
    let currentOrganisations = filers.selectedOrganisations;

    let tempEventArray: CalendarEvent[] = [];
    for (let event of this.allEvents()) {
      if (currentTypes.includes(event['typeId'])) {
        if (currentOrganisations.includes(event['organisationId']))
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

  async getOrganisation() {
    const organisations:any[] = await Promise.all(await lastValueFrom(this.orgServ.getMy()))
    this.organisations.set(organisations);
  }

  setLocalStorage() {
    let local: string | null = localStorage.getItem('showWeekends');
    if (local === null) {
      localStorage.setItem('showWeekends', String(true));
      local = 'true';
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


  async getEvents() {
    let events: EventDto[] = [];
    let reservations: any[] = [];
    await this.getOrganisation();
    for (let organisation of this.organisations()) {
      try {
        const [eventsResult, reservationsResult] = await Promise.all([
          await lastValueFrom(this.orgServ.getEvents(organisation.id)),
          await lastValueFrom(this.orgServ.getOrganizationReservations(organisation.id))
        ]);

        events.push(...eventsResult);
        reservations.push(...reservationsResult.map(reservation => ({ organisation, reservation })));
      } catch (err) {
        console.error('An error occurred:', err);
      }
    }

    this.organisationEvents.set(events);
    this.organisationReservation.set(reservations);
  }

  async createEvents() {
    await this.getEvents();

    let temp: any[] = [];

    for (let event of this.organisationEvents()) {
      temp.push(this.createEvent(event));
    }
    for (let res of this.organisationReservation()) {
      temp.push(this.createReservation(res));
    }

    this.allEvents.set(temp);
    this.visibleEvents.set(temp);
    this.updateCalendar();
  }



  private createEvent(eventData: EventDto) {
    let color = eventData.organization.colorForDefaultImage;
    let orgName = eventData.organization.name;
    let type = 'event';
    let orgId = eventData.organization.id.toString();
    let newEvent: CalendarEvent = {
      organisationId: orgId,
      organisationName: orgName,
      type: type,
      typeId: '1',
      title: eventData.eventType, //eventData.name,
      startStr: eventData.startTime.toString(),
      start: eventData.startTime,
      endStr: eventData.endTime.toString(),
      end: eventData.endTime,
      allDay: false,
      borderColor: color,
      color: eventData.organization.colorForDefaultImage,
      extendedProps: {
        organisationName: eventData.organization.name,
        organisationId: eventData.organization.id.toString(),
        type: 'event',
        backgroundColor: eventData.organization.colorForDefaultImage,
        //description:eventData.description
      },
    };

    return newEvent;
  }

  private createReservation(res: {
    organisation: Organization;
    reservation: Reservation;
  }) {
    let orgId = res.organisation.id.toString();
    let orgName = res.organisation.name;
    let type = 'reservation';
    let newReservation: CalendarEvent = {
      organisationId: orgId,
      organisationName: orgName,
      type: type,
      typeId: '2',
      title: 'rezerwacja', //eventData.name,
      startStr: res.reservation.startTime.toString(),
      start: res.reservation.startTime,
      endStr: res.reservation.endTime.toString(),
      end: res.reservation.endTime,
      color: '#367790',
      allDay: false,
      borderColor: res.organisation.colorForDefaultImage,
      extendedProps: {
        organisationName: orgName,
        organisationId: orgId,
        type: 'event',
        backgroundColor: '#367790',
        //description:eventData.description
      },
    };
    return newReservation;
  }
}
