import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEventsComponent } from '@app/features/calendar/calendar-events/calendar-events.component';
import { CalendarComponent } from "@app/features/calendar/calendar.component";
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MenuModule} from "primeng/menu";
import { CalendarFilterComponent } from './calendar-filter/calendar-filter.component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    CalendarEventsComponent,
    CalendarComponent,
    CalendarBodyComponent,
    CalendarFilterComponent
  ],
  imports: [
    CommonModule,
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MenuModule,
    SharedModule,
  ],
  exports: [
    CalendarEventsComponent,
    CalendarComponent,
    CalendarBodyComponent
  ]
})
export class CalendarModule { }
