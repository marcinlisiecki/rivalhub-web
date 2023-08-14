import {
  AfterViewInit,
  Component,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { Calendar, EventApi } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss'],
})
export class CalendarEventsComponent implements OnInit, AfterViewInit {
  currentDayEvents: WritableSignal<EventApi[]> = this.serv.currentDayEvents;
  api!: Calendar;

  constructor(private serv: CalendarService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.api = this.serv.api;
    }, 200);
  }
}
