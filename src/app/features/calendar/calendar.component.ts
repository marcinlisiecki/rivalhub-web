import { Component } from '@angular/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  sidebarVisible: boolean = false;
  sidebarWidth = '0';

  constructor(private serv: CalendarService) {
    setTimeout(() => {
      this.serv.api.view.calendar.updateSize();
    }, 200);
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    if (this.sidebarVisible) {
      this.sidebarWidth = '25dvw';
    } else {
      this.sidebarWidth = '0';
    }
    setTimeout(() => {
      this.serv.api.view.calendar.updateSize();
    }, 0);
  }
}
