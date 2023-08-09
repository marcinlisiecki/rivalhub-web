import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStationComponent } from '@app/features/station/add-station/add-station.component';
import { ViewStationsComponent } from '@app/features/station/view-stations/view-stations.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditStationComponent } from './view-stations/edit-station/edit-station.component';
import { ViewStationComponent } from './view-stations/view-station/view-station.component';

@NgModule({
  declarations: [AddStationComponent, ViewStationsComponent, EditStationComponent, ViewStationComponent],
  imports: [
    RouterModule,
    CommonModule,
    TableModule,
    TableModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [AddStationComponent, ViewStationsComponent],
})
export class StationModule {}
