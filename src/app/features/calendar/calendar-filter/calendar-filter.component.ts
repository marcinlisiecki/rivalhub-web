import { Component, WritableSignal } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';

@Component({
  selector: 'app-calendar-filter',
  templateUrl: './calendar-filter.component.html',
  styleUrls: ['./calendar-filter.component.scss'],
})
export class CalendarFilterComponent {
  calendarOptions!: WritableSignal<CalendarOptions>;

  constructor(private calendarService: CalendarService) {
    this.calendarOptions = this.calendarService.options;
  }

  handleWeekendsToggle() {
    this.calendarService.handleWeekendsToggle();
  }
}
