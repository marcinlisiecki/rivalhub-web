import {
  Component,
  WritableSignal,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DateClickArg } from '@fullcalendar/interaction';
import { DatePipe } from '@angular/common';
import { API_DATE_FORMAT } from '@app/core/constants/date';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss'],
})
export class CalendarBodyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @Output() dateClick = new EventEmitter();

  currentDate = new Date();
  calendarOptions!: WritableSignal<CalendarOptions>;
  events = this.calendarService.visibleEvents;

  constructor(
    private calendarService: CalendarService,
    private datePipe: DatePipe,
  ) {}
  ngOnInit() {
    this.calendarOptions = this.calendarService.options;
    this.calendarOptions.mutate((options) => {
      options.dateClick = this.onDateClick.bind(this);
      options.initialDate = this.currentDate;
      options.eventClick = this.handleEventClick.bind(this);
      options.weekends = Boolean(
        parseInt(<string>localStorage.getItem('showWeekends')),
      );
      options.customButtons = {
        prevCust: {
          icon: 'chevron-left',
          click: () => {
            this.calendarService.api.removeAllEvents();
            this.calendarService.api.prev();
            this.calendarService.getMonthEvents(
              <string>(
                this.datePipe.transform(
                  this.calendarService.api.getDate(),
                  API_DATE_FORMAT,
                )
              ),
            );
          },
        },
        nextCust: {
          icon: 'chevron-right',
          click: () => {
            this.calendarService.api.removeAllEvents();
            this.calendarService.api.next();
            this.calendarService.getMonthEvents(
              <string>(
                this.datePipe.transform(
                  this.calendarService.api.getDate(),
                  API_DATE_FORMAT,
                )
              ),
            );
          },
        },
      };
      options.headerToolbar = {
        left: 'prevCust,nextCust',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay listWeek',
      };
    });
    this.calendarService.currentDate.set(this.currentDate);
    this.calendarService.currentDayFilter(this.currentDate.toDateString());
  }

  ngOnDestroy() {
    this.calendarService.langChangeEffect.destroy();
  }

  ngAfterViewInit() {
    this.calendarService.setCalendarApi(this.calendarComponent.getApi());
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.dateClick.emit();
    let data = <Date>clickInfo.event.start;
    if (this.isMonthView()) this.calendarService.api.select(data);
    else {
      this.calendarService.currentDate.set(<Date>clickInfo.event.start);
      this.calendarService.updateCalendar();
    }
  }
  onDateClick(selectedDate: DateClickArg) {
    this.dateClick.emit();
    if (this.isMonthView()) this.calendarService.api.select(selectedDate.date);
    else {
      this.calendarService.currentDate.set(selectedDate.date);
      this.calendarService.updateCalendar();
    }
  }

  isTitleIsToLong(title: string): boolean {
    return title.length > 12;
  }

  isMonthView() {
    return (
      this.calendarComponent.getApi().getCurrentData().currentViewType ===
      'dayGridMonth'
    );
  }
}
