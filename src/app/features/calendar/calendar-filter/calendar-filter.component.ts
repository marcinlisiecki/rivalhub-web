import { Component, WritableSignal, signal, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-calendar-filter',
  templateUrl: './calendar-filter.component.html',
  styleUrls: ['./calendar-filter.component.scss'],
})
export class CalendarFilterComponent implements OnInit {
  calendarOptions!: WritableSignal<CalendarOptions>;
  displayMenu: boolean = false;

  constructor(private calendarService: CalendarService) {}
  ngOnInit() {
    this.calendarOptions = this.calendarService.options;
  }

  handleWeekendsToggle() {
    this.calendarService.handleWeekendsToggle();
  }
}
