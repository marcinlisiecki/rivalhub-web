import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReservationComponent } from '@app/features/reservation/add-reservation/add-reservation.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [AddReservationComponent],
  imports: [
    RouterModule,
    CommonModule,
    CalendarModule,
    FormsModule,
    SharedModule,
    TranslateModule,
  ],
  exports: [CommonModule, CalendarModule, FormsModule, SharedModule],
})
export class ReservationModule {}
