import { Component, WritableSignal, OnInit, Input } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { Organization } from '@interfaces/organization/organization';
import { Filters } from '@interfaces/calendar/calendar-filters';

@Component({
  selector: 'app-calendar-filter',
  templateUrl: './calendar-filter.component.html',
  styleUrls: ['./calendar-filter.component.scss'],
})
export class CalendarFilterComponent implements OnInit {
  @Input() selectedFilters!: Filters;
  @Input() organizations!: Organization[];
  displayMenu: boolean = false;

  types: any[] = [
    { name: 'Wydarzenie', key: 'event', id: '1' },
    { name: 'Rezerwacja', key: 'reservation', id: '2' },
  ];

  icon: string = 'pi pi-angle-down';

  constructor(private calendarService: CalendarService) {}
  async ngOnInit() {}

  changeDisplayMenu() {
    this.displayMenu = !this.displayMenu;
    if (!this.displayMenu) {
      this.icon = 'pi pi-angle-down';
    } else {
      this.icon = 'pi pi-angle-up';
    }
  }
  handleFilterChange(newFilters: Filters) {
    this.selectedFilters = newFilters;
    this.calendarService.filters = newFilters;
  }
}
