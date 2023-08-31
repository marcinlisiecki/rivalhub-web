import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AddQueue } from '@app/core/interfaces/event/games/darts/add-queue';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddQueueComponent } from '../../add-darts-results/add-leg/add-queue/add-queue.component';
import { LanguageService } from '@app/core/services/language/language.service';
import { DartQueue } from '@app/core/interfaces/event/games/darts/dart-queue';
import { DartsLeg } from '@app/core/interfaces/event/games/darts/dart-leg';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute } from '@angular/router';
import { FakeDartsLeg } from '@app/core/interfaces/event/games/darts/fake-darts-leg';
import { AddQueueDto } from '@app/core/interfaces/event/games/darts/add-queue-dto';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  TOAST_LIFETIME,
  TOAST_LIFETIME_LONG,
} from '@app/core/constants/messages';
import { AuthService } from '@app/core/services/auth/auth.service';
import { dartFormatToLabel } from '@app/core/utils/dartFormatToLabel';

@Component({
  selector: 'app-view-darts-match',
  templateUrl: './view-darts-match.component.html',
  styleUrls: ['./view-darts-match.component.scss'],
})
export class ViewDartsMatchComponent implements OnInit {
  @Input({ required: true }) match!: DartsLeg;
  @Input() editable: boolean = false;

  @Output() approveMatch: EventEmitter<number> = new EventEmitter<number>();

  newQueue: AddQueue[] = [];

  addQueueDialogRef?: DynamicDialogRef;

  organizationId!: number;
  eventId!: number;
  loggedInUserId!: number;

  constructor(
    private dialogService: DialogService,
    public languageService: LanguageService,
    private eventService: EventsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
  ) {
    this.loggedInUserId = authService.getUserId() as number;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.organizationId = params['organizationId'];
      this.eventId = params['eventId'];
    });
  }

  openAddQueueDialog() {
    this.addQueueDialogRef = this.dialogService.open(AddQueueComponent, {
      data: {
        newQueue: this.newQueue,
        match: this.match,
      },
      header: this.languageService.instant('event.addQueue'),
      width: '40rem',
    });

    this.addQueueDialogRef.onClose.subscribe((queue: AddQueue[]) => {
      if (queue) {
        const queueInput: AddQueueDto = {
          singlePlayerScoreInRoundsList: queue,
        };

        this.match.participants.forEach((user, index) => {
          if (this.match.pointsLeftInLeg[index] == 0) {
            queue[index].blanks = 0;
          }
        });

        this.eventService
          .addDartsQueue(
            this.organizationId,
            this.eventId,
            this.match.id,
            queueInput,
          )
          .subscribe({
            next: (leg: FakeDartsLeg) => {
              this.match = this.eventService.mapDartsMatch(leg);
              this.match.participants.forEach((user, i) => {
                if (
                  this.match.pointsLeftInLeg[i] == 0 &&
                  this.match.pointsLeftInLegAfterRound[
                    this.match.pointsLeftInLegAfterRound.length - 1
                  ][i] !== 0
                )
                  this.messageService.add({
                    severity: 'success',
                    life: TOAST_LIFETIME_LONG,
                    summary: `${user.name} ${this.languageService.instant(
                      'event.leg.won',
                    )} ${this.match.placesInLeg[i]}`,
                  });
              });

              if (this.isLegOver()) {
                this.messageService.add({
                  severity: 'success',
                  life: TOAST_LIFETIME_LONG,
                  summary: this.languageService.instant('event.leg.finished'),
                });
              }
            },
          });
      }
    });
  }

  onDelete(icon: Event, roundId: number) {
    if (!this.editable) return;

    this.confirmationService.confirm({
      target: icon.target as EventTarget,
      acceptLabel: this.languageService.instant('common.yes'),
      rejectLabel: this.languageService.instant('common.no'),
      icon: 'pi pi-exclamation-triangle',
      message: this.languageService.instant('event.set.deleteQuestion'),
      accept: () => {
        this.eventService
          .deleteDartsQueue(
            this.organizationId,
            this.eventId,
            this.match.id,
            roundId,
          )
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                life: TOAST_LIFETIME,
                summary: this.languageService.instant(
                  'event.series.deleteConfirmation',
                ),
              });
              this.match.scoresInMatch = this.match.scoresInMatch.filter(
                (score, index) => index !== roundId,
              );
              this.match.pointsLeftInLegAfterRound =
                this.match.pointsLeftInLegAfterRound.filter(
                  (points, index) => index !== roundId,
                );
            },
          });
        this.match.pointsLeftInLeg.forEach((points, index) => {
          this.match.pointsLeftInLeg[index] =
            this.match.pointsLeftInLegAfterRound[
              this.match.pointsLeftInLegAfterRound.length - 1
            ][index];
        });
      },
    });
  }

  isLegOver() {
    return this.match.pointsLeftInLeg.every((points) => points === 0);
  }

  playerFinished(index: number, col: number) {
    const isFinished =
      this.match.pointsLeftInLeg[index] == 0 &&
      this.match.pointsLeftInLegAfterRound[
        this.match.pointsLeftInLegAfterRound.length - 1
      ][index] !== 0;
    return isFinished;
  }

  getHits(bounceOuts: number): number[] {
    if (bounceOuts === 3) return [];
    return new Array(3 - bounceOuts);
  }

  getMisses(bounceOuts: number): number[] {
    if (bounceOuts === 0) return [];
    return new Array(bounceOuts);
  }

  calculateRows() {
    if (this.editable) {
      return this.match.participants.length + 2;
    }
    return this.match.participants.length + 1;
  }

  protected readonly dartFormatToLabel = dartFormatToLabel;
}
