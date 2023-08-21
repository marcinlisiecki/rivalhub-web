import {
  Component,
  WritableSignal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { Organization } from '@interfaces/organization/organization';

export interface Filters {
  selectedOrganisations: string[];
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
  organisations!: Organization[];
  selectedOrganisations: string[] = [];

  types: any[] = [
    { name: 'Wydarzenie', key: 'event', id: '1' },
    { name: 'Rezerwacja', key: 'reservation', id: '2' },
  ];

  selectedFilters: Filters = {
    selectedOrganisations: this.selectedOrganisations,
    selectedTypes: ['1', '2'],
  };

  constructor(
    private calendarService: CalendarService,
  ) {}
  async ngOnInit() {
    this.calendarOptions = this.calendarService.options;
    await this.calendarService.getOrganisation();
    this.organisations = this.calendarService.organisations();
    this.organisations.forEach( organisation =>{this.selectedFilters.selectedOrganisations.push(organisation.id.toString());} )

  }

  handleFilterChange(newFilters: Filters) {
    this.selectedFilters = newFilters;
  }

}
