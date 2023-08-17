import { Component, OnInit } from '@angular/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  sidebarHeader = this.serv.currentDate;
  sidebarVisible: boolean = false;
  sidebarWidth = '0';
  sidebarIcon? = 'pi pi-arrow-right';
  constructor(private serv: CalendarService) {}

  ngOnInit() {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    if (this.sidebarVisible) {
      this.sidebarIcon = 'pi pi-arrow-left';
      this.sidebarWidth = '25dvw';
    } else {
      this.sidebarIcon = 'pi pi-arrow-right';
      this.sidebarWidth = '0';
    }

    setTimeout(() => {
      this.serv.api.view.calendar.updateSize();
    }, 0);
  }
}
