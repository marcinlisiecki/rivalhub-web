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
  ],
  exports: [AddStationComponent, ViewStationsComponent],
})
export class StationModule {}
