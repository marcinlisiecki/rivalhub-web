import {
  Component,
  WritableSignal,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { Organization } from '@interfaces/organization/organization';
import { HttpErrorResponse } from '@angular/common/http';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { Subscription } from 'rxjs';

export interface Filters {
  selectedOrganisations: string[];
  selectedTypes: any[];
}

@Component({
  selector: 'app-calendar-filter',
  templateUrl: './calendar-filter.component.html',
  styleUrls: ['./calendar-filter.component.scss'],
})
export class CalendarFilterComponent implements OnInit, OnDestroy {
  calendarOptions!: WritableSignal<CalendarOptions>;
  displayMenu: boolean = false;
  sub!: Subscription;
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
    private orgServ: OrganizationsService,
  ) {}
  ngOnInit() {
    this.calendarOptions = this.calendarService.options;
    this.sub = this.orgServ.getMy().subscribe({
      next: (res: Organization[]) => {
        for (let i of res) {
          this.selectedFilters.selectedOrganisations.push(i.id.toString());
        }
        this.organisations = res;
        this.calendarService.organisations.set(res);
      },
      error: (err: HttpErrorResponse) => {
        console.error('An error occurred:', err);
      },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  handleFilterChange(newFilters: Filters) {
    this.selectedFilters = newFilters;
  }
}
