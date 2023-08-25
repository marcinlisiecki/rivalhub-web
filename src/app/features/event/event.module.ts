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
import { AddGameSetComponent } from '@app/features/event/common/add-game-set/add-game-set.component';
import { DialogService } from 'primeng/dynamicdialog';
import { NewEventMatchComponent } from '@app/features/event/common/new-event-match/new-event-match.component';
import { ViewEventComponent } from '@app/features/event/view-event/view-event.component';
import { ViewPingPongMatchComponent } from '@app/features/event/ping-pong/view-ping-pong-matches/view-ping-pong-match/view-ping-pong-match.component';
import { ViewGameSetComponent } from '@app/features/event/common/view-game-sets/view-game-set/view-game-set.component';
import { ViewGameSetsComponent } from './common/view-game-sets/view-game-sets.component';
import { ViewPingPongMatchesComponent } from '@app/features/event/ping-pong/view-ping-pong-matches/view-ping-pong-matches.component';
import { BadgeModule } from 'primeng/badge';
import { ViewTableFootballMatchesComponent } from './table-football/view-table-football-matches/view-table-football-matches.component';
import { ViewTableFootballMatchComponent } from './table-football/view-table-football-matches/view-table-football-match/view-table-football-match.component';
import { AddTableFootballResultsComponent } from './table-football/add-table-football-results/add-table-football-results.component';
import { AddResultsComponent } from './add-results/add-results.component';
import { ViewPullUpsMatchesComponent } from './pull-ups/view-pull-ups-matches/view-pull-ups-matches.component';
import { ViewPullUpsMatchComponent } from './pull-ups/view-pull-ups-matches/view-pull-ups-match/view-pull-ups-match.component';
import { TableModule } from 'primeng/table';

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
    AddGameSetComponent,
    NewEventMatchComponent,
    ViewEventComponent,
    ViewPingPongMatchComponent,
    ViewGameSetComponent,
    ViewGameSetsComponent,
    ViewPingPongMatchesComponent,
    ViewTableFootballMatchesComponent,
    ViewTableFootballMatchComponent,
    AddTableFootballResultsComponent,
    AddResultsComponent,
    ViewPullUpsMatchesComponent,
    ViewPullUpsMatchComponent,
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
    BadgeModule,
    TableModule,
  ],
  providers: [DialogService],
})
export class EventModule {}
