import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { API_DATE_FORMAT } from '@app/core/constants/date';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  sidebarHeader = this.calendarService.currentDate;
  sidebarVisible: boolean = false;
  sidebarWidth = '0';
  sidebarIcon? = 'pi pi-arrow-right';
  calendarMargin = '0';

  constructor(
    private calendarService: CalendarService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.calendarService.getMonthEvents(
      <string>this.datePipe.transform(new Date(), API_DATE_FORMAT),
    );
  }

  ngOnDestroy() {
    this.calendarService.calendarEventsSub.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    if (this.sidebarVisible) {
      this.sidebarIcon = 'pi pi-arrow-left';
      this.sidebarWidth = '25dvw';
      this.calendarMargin = '0';
    } else {
      this.sidebarIcon = 'pi pi-arrow-right';
      this.sidebarWidth = '0';
      this.calendarMargin = '0';
    }
    setTimeout(() => {
      this.calendarService.api.view.calendar.updateSize();
    }, 200);
  }
}
