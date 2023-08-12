import {
  Component,
  signal,
  WritableSignal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from '@app/core/services/calendar/calendar.service';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss'],
})
export class CalendarBodyComponent implements OnInit, OnDestroy {
  calendarVisible = signal(true);
  calendarOptions!: WritableSignal<CalendarOptions>;
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarOptions = this.calendarService.options;
  }

  ngOnDestroy() {
    this.calendarService.langChangeEffect.destroy();
  }
  handleWeekendsToggle() {
    this.calendarService.handleWeekendsToggle();
  }
}
