import {
  AfterViewInit,
  Component,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { Calendar, EventApi, EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss'],
})
export class CalendarEventsComponent implements OnInit, AfterViewInit {
  currentDayEvents: WritableSignal<EventInput[]> = this.serv.currentDayEvents;
  currentDate = this.serv.currentDate;

  constructor(private serv: CalendarService) {}

  ngOnInit() {}
  ngAfterViewInit() {}

  getDate(event: EventInput): Date {
    return <Date>event['start'];
  }
}
