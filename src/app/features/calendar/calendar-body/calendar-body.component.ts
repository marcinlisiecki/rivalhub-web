import {
  Component,
  signal,
  WritableSignal,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss'],
})
export class CalendarBodyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarVisible = signal(true);
  calendarOptions!: WritableSignal<CalendarOptions>;
  events!: WritableSignal<EventApi[]>;
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarOptions = this.calendarService.options;
  }

  ngOnDestroy() {
    this.calendarService.langChangeEffect.destroy();
  }
  ngAfterViewInit() {
    this.calendarService.setCalendarApi(this.calendarComponent.getApi());
    this.events = this.calendarService.events;
  }
}
