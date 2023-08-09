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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CategorySelectorComponent } from './new-event/category-selector/category-selector.component';
import { BasicInfoComponent } from './new-event/basic-info/basic-info.component';
import { DateSelectorComponent } from './new-event/date-selector/date-selector.component';
import { StationSelectorComponent } from './new-event/station-selector/station-selector.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { AddUserPingPongComponent } from './new-event/add-user-ping-pong/add-user-ping-pong.component';
import { AddUserDialogComponent } from './new-event/add-user-dialog/add-user-dialog.component';

@NgModule({
  declarations: [
    NewEventComponent,
    CategorySelectorComponent,
    BasicInfoComponent,
    DateSelectorComponent,
    StationSelectorComponent,
    AddUserPingPongComponent,
    AddUserDialogComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    StepsModule,
    DividerModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ProgressSpinnerModule,
  ],
})
export class EventModule {}
