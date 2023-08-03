import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEventComponent } from './new-event/new-event.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [NewEventComponent],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    StepsModule,
    DividerModule,
    CheckboxModule,
  ],
})
export class EventModule {}
