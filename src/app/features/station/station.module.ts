import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStationComponent } from '@app/features/station/add-station/add-station.component';
import { ViewStationsComponent } from '@app/features/station/view-stations/view-stations.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
@NgModule({
  declarations: [AddStationComponent, ViewStationsComponent],
  imports: [
    RouterModule,
    CommonModule,
    TableModule,
    TableModule,
    SharedModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    CheckboxModule,
    InputSwitchModule,
    ConfirmPopupModule,
  ],
  exports: [AddStationComponent, ViewStationsComponent],
  providers: [ConfirmationService],
})
export class StationModule {}
