import {
  Component,
  WritableSignal,
} from '@angular/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { EventInput } from '@fullcalendar/core';
import {categoryTypeToLabel} from "@app/core/utils/event";

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss'],
})
export class CalendarEventsComponent {
  currentDayEvents: WritableSignal<EventInput[]> = this.calendarService.currentDayEvents;

  constructor(private calendarService: CalendarService) {}

  getDate(event: EventInput): Date {
    return <Date>event['start'];
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
