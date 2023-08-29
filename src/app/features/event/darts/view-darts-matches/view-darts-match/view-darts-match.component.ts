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
  ) {}

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
        participants: this.match.participants,
      },
      header: this.languageService.instant('event.addQueue'),
      width: '40rem',
    });

    this.addQueueDialogRef.onClose.subscribe((queue: AddQueue[]) => {
      if (queue) {
        console.log(queue);
        // this.eventService
        //   .addDartsQueue(this.organizationId, this.eventId, 1, queue)
        //   .subscribe({
        //     next: (leg: FakeDartsLeg) => {
        //       this.match = this.eventService.mapDartsMatch(leg);
        //     },
        //   });
      }
    });
  }

  getHits(bounceOuts: number): number[] {
    return new Array(3 - bounceOuts);
  }
  getMisses(bounceOuts: number): number[] {
    return new Array(bounceOuts);
  }

  calculateRows() {
    return this.match.participants.length + 1;
  }
}
