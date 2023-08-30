import { Component } from '@angular/core';
import { ReservationsService } from '@app/core/services/reservations/reservations.service';
import { Reservation } from '@interfaces/reservation/reservation';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorsService } from '@app/core/services/errors/errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@app/core/utils/apiErrors';
import { DISPLAY_DATE_FORMAT } from '@app/core/constants/date';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TOAST_LIFETIME } from '@app/core/constants/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LanguageService } from '@app/core/services/language/language.service';
import { categoryTypeToLabel } from '@app/core/utils/event';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.scss'],
})
export class ViewReservationComponent {
  organizationId!: number;
  reservationId!: number;
  loggedUserId!: number;

  reservation?: Reservation;

  constructor(
    private reservationsService: ReservationsService,
    private route: ActivatedRoute,
    private errorsService: ErrorsService,
    private authService: AuthService,
    private messageService: MessageService,
    private languageService: LanguageService,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {
    this.organizationId = this.route.snapshot.params['organizationId'];
    this.reservationId = this.route.snapshot.params['reservationId'];
    this.loggedUserId = this.authService.getUserId() as number;

    this.fetchReservation();
  }

  fetchReservation() {
    this.reservationsService.getReservation(this.reservationId).subscribe({
      next: (reservation: Reservation) => {
        this.reservation = reservation;
      },
      error: (err: HttpErrorResponse) => {
        this.errorsService.createErrorMessage(extractMessage(err));
      },
    });
  }

  onRemoveEvent(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      acceptLabel: this.languageService.instant('common.yes'),
      rejectLabel: this.languageService.instant('common.no'),
      icon: 'pi pi-exclamation-triangle',
      message: this.languageService.instant('reservation.deleteQuestion'),
      accept: () => {
        this.reservationsService
          .deleteReservation(this.reservationId)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                life: TOAST_LIFETIME,
                summary: this.languageService.instant(
                  'reservation.deleteConfirmation',
                ),
              });
              this.router.navigateByUrl(
                `/organizations/${this.organizationId}`,
              );
            },
            error: (err) => {
              this.errorsService.createErrorMessage(extractMessage(err));
            },
          });
      },
      reject: () => {},
    });
  }

  protected readonly DISPLAY_DATE_FORMAT = DISPLAY_DATE_FORMAT;
  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
