import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  WritableSignal,
} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { Organization } from '@interfaces/organization/organization';
import { Filters } from '@interfaces/calendar/calendar-filters';

@Component({
  selector: 'app-calendar-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})
export class FilterMenuComponent implements OnInit, OnDestroy {
  @Input() organizations!: Organization[];
  @Input() types!: any;
  @Input() selectedFilters!: Filters;
  @Output() selectedFiltersChanged = new EventEmitter<Filters>();

  calendarOptions!: WritableSignal<CalendarOptions>;
  selectedWeeks: boolean = Boolean(
    parseInt(<string>localStorage.getItem('showWeekends')),
  );

  constructor(private calendarService: CalendarService) {}
  ngOnInit() {
    this.calendarOptions = this.calendarService.options;
  }

  ngOnDestroy() {
    this.selectedFiltersChanged.emit(this.selectedFilters);
  }

  toggleWeekends() {
    this.calendarService.handleWeekendsToggle();
  }

  selectedOrganization() {
    this.calendarService.currentFilter(this.selectedFilters);
  }

  selectedType() {
    this.calendarService.currentFilter(this.selectedFilters);
  }
}
