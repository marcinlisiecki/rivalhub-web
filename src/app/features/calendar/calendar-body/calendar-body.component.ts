import {
  Component,
  signal,
  WritableSignal,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
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

  currentDate = new Date('2023-08-08');
  calendarOptions!: WritableSignal<CalendarOptions>;
  calendarVisible = signal(true);
  events = this.calendarService.visibleEvents;
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarOptions = this.calendarService.options;
    this.calendarOptions.mutate((options) => {
      options.dateClick = this.onDateClick.bind(this);
      options.initialDate = this.currentDate;
      this.calendarService.getOrganisation();
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

  onDateClick(selectedDate: DateClickArg) {
    this.dateClick.emit();
    this.calendarService.currentSelectedDate = signal(selectedDate);
    this.calendarService.currentDayFilter(selectedDate.dateStr);
    this.calendarService.currentDate.set(selectedDate.date);
  }
}
