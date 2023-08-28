import { Component, Input, OnInit } from '@angular/core';
import { AddQueue } from '@app/core/interfaces/event/games/darts/add-queue';
import { DartsLeg } from '@app/core/interfaces/event/games/darts/darts-leg';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddQueueComponent } from '../../add-darts-results/add-leg/add-queue/add-queue.component';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-view-darts-match',
  templateUrl: './view-darts-match.component.html',
  styleUrls: ['./view-darts-match.component.scss'],
})
export class ViewDartsMatchComponent implements OnInit {
  @Input({ required: true }) match!: DartsLeg;

  newQueue: AddQueue[] = [
    {
      score: 1,
      blanks: 0,
    },
  ];

  addQueueDialogRef?: DynamicDialogRef;
  constructor(
    private dialogService: DialogService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {}

  openAddQueueDialog() {
    this.addQueueDialogRef = this.dialogService.open(AddQueueComponent, {
      data: {
        require3Characters: false,
        newQueue: this.newQueue,
        participants: this.match.participants,
      },
      header: this.languageService.instant('event.addQueue'),
      width: '25rem',
    });

    this.addQueueDialogRef.onClose.subscribe((queue) => {});
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
