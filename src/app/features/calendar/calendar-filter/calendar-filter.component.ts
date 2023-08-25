import { Component, WritableSignal, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { Organization } from '@interfaces/organization/organization';

export interface Filters {
  selectedOrganizations: string[];
  selectedTypes: any[];
}

@Component({
  selector: 'app-calendar-filter',
  templateUrl: './calendar-filter.component.html',
  styleUrls: ['./calendar-filter.component.scss'],
})
export class CalendarFilterComponent implements OnInit {
  calendarOptions!: WritableSignal<CalendarOptions>;
  displayMenu: boolean = false;
  organizations!: Organization[];
  selectedOrganizations: string[] = [];

  types: any[] = [
    { name: 'Wydarzenie', key: 'event', id: '1' },
    { name: 'Rezerwacja', key: 'reservation', id: '2' },
  ];

  selectedFilters: Filters = {
    selectedOrganizations: this.selectedOrganizations,
    selectedTypes: ['1', '2'],
  };
  icon: string = 'pi pi-angle-down';

  constructor(private calendarService: CalendarService) {}
  async ngOnInit() {
    this.calendarOptions = this.calendarService.options;
    await this.calendarService.getOrganization();
    this.organizations = this.calendarService.organizations();
    this.organizations.forEach((organization) => {
      this.selectedFilters.selectedOrganizations.push(
        organization.id.toString(),
      );
    });
  }

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
  }
}
