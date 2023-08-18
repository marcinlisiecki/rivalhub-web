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
import { EventDto } from '@interfaces/event/event-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import { async } from 'rxjs';

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

  getEvents() {
    let events: EventDto[] = [];
    let reservations: any[] = [];
    for (let organisation of this.organisations()) {
      this.orgServ.getEvents(organisation.id).subscribe({
        next: (res: EventDto[]) => {
          for (let res2 of res) {
            console.log(res2);
            events.push(res2);
          }
          this.organisationEvents.set(events);
        },
        error: (err: HttpErrorResponse) => {
          console.error('An error occurred:', err);
        },
      });
      this.orgServ.getOrganizationReservations(organisation.id).subscribe({
        next: (res: Reservation[]) => {
          for (let res2 of res) {
            console.log(res2);
            reservations.push({ organisation, reservation: res2 });
          }
          this.organisationReservation.set(reservations);
        },
      });
    }
  }

  createEvents() {
    let temp: any[] = [];
    console.log(this.organisationEvents(), this.organisationReservation());
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
