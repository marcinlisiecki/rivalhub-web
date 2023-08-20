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

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss'],
})
export class CalendarBodyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @Output() dateClick = new EventEmitter();

  selectedDate!: any;
  currentDate = new Date('2023-08-08');
  calendarOptions!: WritableSignal<CalendarOptions>;
  events = this.calendarService.visibleEvents;
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarOptions = this.calendarService.options;
    console.log(Boolean(parseInt( <string>localStorage.getItem('showWeekends'))),localStorage.getItem('showWeekends'))
    this.calendarOptions.mutate((options) => {
      options.dateClick = this.onDateClick.bind(this);
      options.initialDate = this.currentDate;
      options.eventClick = this.handleEventClick.bind(this);
      options.weekends = Boolean(parseInt(<string>localStorage.getItem('showWeekends')));
    });
    this.calendarService.currentDate.set(this.currentDate);
    this.calendarService.currentDayFilter(this.currentDate.toDateString());
  }

  ngOnDestroy() {
    this.calendarService.langChangeEffect.destroy();
  }

  ngAfterViewInit() {
    this.calendarService.setCalendarApi(this.calendarComponent.getApi());
    this.calendarService.getOrganisation();
  }

  handleEventClick(clickInfo: EventClickArg) {
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
