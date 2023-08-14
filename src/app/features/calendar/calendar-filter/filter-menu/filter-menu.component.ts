import { Component, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { Organization } from '@interfaces/organization/organization';
import { HttpErrorResponse } from '@angular/common/http';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';

@Component({
  selector: 'app-calendar-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})
export class FilterMenuComponent implements OnInit, OnDestroy {
  selectedOrganisations: Array<string> = [];
  calendarOptions!: WritableSignal<CalendarOptions>;
  weekend = this.calendarService.currentWeekends;
  selectedTypes: any[] = [];
  selectedWeeks: any = this.weekend();

  types: any[] = [
    { name: 'Wydarzenie', key: 'event' },
    { name: 'Rezerwacja', key: 'reservation' },
  ];
  organisations!: WritableSignal<Organization[]>;
  public organisationsArray!: Organization[];

  constructor(
    private calendarService: CalendarService,
    private orgServ: OrganizationsService,
  ) {}
  ngOnInit() {
    this.calendarOptions = this.calendarService.options;
    this.selectedOrganisations =
      this.calendarService.filter.selectedOrganisations;
    let sub = this.orgServ.getMy().subscribe({
      next: (res: Organization[]) => {
        this.organisationsArray = res;
      },
      //Dodaj kiedyś obsługę błędów jak wpadniesz na fajny pomysł jak to zrobić
      error: (err: HttpErrorResponse) => {
        console.error('An error occurred:', err);
      },
    });

    console.log(this.selectedOrganisations);
  }

  ngOnDestroy() {
    this.calendarService.filter.selectedOrganisations =
      this.selectedOrganisations;
  }

  toggleWeekends() {
    this.calendarService.handleWeekendsToggle();
    console.log(this.selectedWeeks);
  }

  selectedOrganisation() {
    console.log(this.selectedOrganisations);
  }
}
