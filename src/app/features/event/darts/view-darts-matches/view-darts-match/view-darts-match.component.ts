import { Component, Input, OnInit } from '@angular/core';
import { AddQueue } from '@app/core/interfaces/event/games/darts/add-queue';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddQueueComponent } from '../../add-darts-results/add-leg/add-queue/add-queue.component';
import { LanguageService } from '@app/core/services/language/language.service';
import { DartQueue } from '@app/core/interfaces/event/games/darts/dart-queue';
import { DartsLeg } from '@app/core/interfaces/event/games/darts/dart-leg';

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
  constructor(
    private dialogService: DialogService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {}

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
      console.log(this.match);
      if (queue) {
        //TODO: naprawić dodawanie kolejki do meczu
        // for (let i = 0; i < queue.length; i++) {
        //   this.match.scoresInMatch[i].push(queue[i].score);
        //   this.match.bounceOutsInLeg[i] += queue[i].blanks;
        // }
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
