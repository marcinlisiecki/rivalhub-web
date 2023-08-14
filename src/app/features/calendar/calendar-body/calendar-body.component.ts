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
import { CalendarOptions, EventApi, EventClickArg } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DateClickArg } from '@fullcalendar/interaction';
import { Organization } from '@interfaces/organization/organization';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss'],
})
export class CalendarBodyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @Output() dateClick = new EventEmitter();

  calendarOptions!: WritableSignal<CalendarOptions>;
  events!: WritableSignal<EventApi[]>;
  calendarVisible = signal(true);
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarOptions = this.calendarService.options;
    this.calendarOptions.mutate((options) => {
      options.dateClick = this.onDateClick.bind(this);
      this.calendarService.getOrganisation();
    });
  }

  ngOnDestroy() {
    this.calendarService.langChangeEffect.destroy();
  }

  ngAfterViewInit() {
    this.calendarService.setCalendarApi(this.calendarComponent.getApi());
    this.events = this.calendarService.events;
  }

  onDateClick(arg: DateClickArg) {
    this.dateClick.emit();
    this.calendarService.currentDayFilter(arg.dateStr);
    console.log();
  }
}
