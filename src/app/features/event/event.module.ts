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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AddEventUsersComponent } from '@app/features/event/new-event/add-event-users/add-event-users.component';
import { AddUserDialogComponent } from './new-event/add-user-dialog/add-user-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { AddPingPongResultsComponent } from './ping-pong/add-ping-pong-results/add-ping-pong-results.component';
import { AddPingPongSetComponent } from './ping-pong/add-ping-pong-set/add-ping-pong-set.component';
import { DialogService } from 'primeng/dynamicdialog';
import { NewEventMatchComponent } from './new-event-match/new-event-match.component';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    NewEventComponent,
    CategorySelectorComponent,
    BasicInfoComponent,
    DateSelectorComponent,
    StationSelectorComponent,
    AddEventUsersComponent,
    AddUserDialogComponent,
    AddPingPongResultsComponent,
    AddPingPongSetComponent,
    NewEventMatchComponent,
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
    TranslateModule,
    InputSwitchModule,
  ],
  providers: [DialogService],
})
export class EventModule {}
