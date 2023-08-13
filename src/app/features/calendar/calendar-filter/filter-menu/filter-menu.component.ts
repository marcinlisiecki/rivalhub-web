import { Component, WritableSignal } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';

@Component({
  selector: 'app-calendar-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})
export class FilterMenuComponent {
  selectedCategories: any[] = [];
  weekend = this.calendarService.currentWeekends;
  selectedTypes: any[] = [];
  selectedWeeks: any = this.weekend();
  organisations: any[] = [
    { name: 'ENSIDISI', key: 'ENSIDISI' },
    { name: 'DISICISI', key: 'DISICISI' },
  ];
  types: any[] = [
    { name: 'Wydarzenie', key: 'event' },
    { name: 'Rezerwacja', key: 'reservation' },
  ];

  calendarOptions!: WritableSignal<CalendarOptions>;

  constructor(private calendarService: CalendarService) {}
  ngOnInit() {
    this.calendarOptions = this.calendarService.options;
  }

  toggleWeekends() {
    this.calendarService.handleWeekendsToggle();
    console.log(this.selectedWeeks);
  }
}
