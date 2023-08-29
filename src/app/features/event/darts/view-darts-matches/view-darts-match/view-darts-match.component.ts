import { Component, Input, OnInit } from '@angular/core';
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
import { TOAST_LIFETIME } from '@app/core/constants/messages';

@Component({
  selector: 'app-view-darts-match',
  templateUrl: './view-darts-match.component.html',
  styleUrls: ['./view-darts-match.component.scss'],
})
export class ViewDartsMatchComponent implements OnInit {
  @Input({ required: true }) match!: DartsLeg;
  @Input() editable: boolean = false;

  newQueue: AddQueue[] = [];

  addQueueDialogRef?: DynamicDialogRef;

  organizationId!: number;
  eventId!: number;
  constructor(
    private dialogService: DialogService,
    private languageService: LanguageService,
    private eventService: EventsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    // this.editable = false;
    this.route.params.subscribe((params) => {
      this.organizationId = params['organizationId'];
      this.eventId = params['eventId'];
    });
    console.log(this.match);
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
        console.log(queue);
        const queueInput: AddQueueDto = {
          singlePlayerScoreInRoundsList: queue,
        };
        this.eventService
          .addDartsQueue(
            this.organizationId,
            this.eventId,
            this.match.matchId,
            queueInput,
          )
          .subscribe({
            next: (leg: FakeDartsLeg) => {
              this.match = this.eventService.mapDartsMatch(leg);
            },
          });
      }
    });
  }

  onDelete(icon: Event, roundId: number) {
    console.log(icon);
    if (!this.editable) return;

    // this.confirmationService.confirm({
    //   target: icon.target as EventTarget,
    //   acceptLabel: this.languageService.instant('common.yes'),
    //   rejectLabel: this.languageService.instant('common.no'),
    //   icon: 'pi pi-exclamation-triangle',
    //   message: this.languageService.instant('event.set.deleteQuestion'),
    //   accept: () => {
    console.log(roundId);
    this.eventService
      .deleteDartsQueue(
        this.organizationId,
        this.eventId,
        this.match.matchId,
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
        },
      });
    //   },
    // });
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
}
