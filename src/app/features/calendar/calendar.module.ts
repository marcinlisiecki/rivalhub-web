import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEventsComponent } from '@app/features/calendar/calendar-events/calendar-events.component';
import { CalendarComponent } from '@app/features/calendar/calendar.component';
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';
import { MenuModule } from 'primeng/menu';
import { CalendarFilterComponent } from './calendar-filter/calendar-filter.component';
import { SharedModule } from '@app/shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { FilterMenuComponent } from './calendar-filter/filter-menu/filter-menu.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CalendarEventsComponent,
    CalendarComponent,
    CalendarBodyComponent,
    CalendarFilterComponent,
    FilterMenuComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    SharedModule,
    FullCalendarModule,
    FormsModule,
    ToastModule,
    CheckboxModule,
  ],
  exports: [CalendarEventsComponent, CalendarComponent, CalendarBodyComponent],
})
export class CalendarModule {}
