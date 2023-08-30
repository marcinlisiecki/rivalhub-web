import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReservationComponent } from '@app/features/reservation/add-reservation/add-reservation.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ViewReservationComponent } from './view-reservation/view-reservation.component';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [AddReservationComponent, ViewReservationComponent],
  imports: [
    RouterModule,
    CommonModule,
    CalendarModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    BadgeModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
  ],
  exports: [CommonModule, CalendarModule, FormsModule, SharedModule],
})
export class ReservationModule {}
