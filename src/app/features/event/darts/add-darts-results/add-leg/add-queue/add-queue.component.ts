import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TOAST_LIFETIME } from '@app/core/constants/messages';
import { AddQueue } from '@app/core/interfaces/event/games/darts/add-queue';
import { DartsLeg } from '@app/core/interfaces/event/games/darts/dart-leg';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberInputEvent } from 'primeng/inputnumber';

@Component({
  selector: 'app-add-queue',
  templateUrl: './add-queue.component.html',
  styleUrls: ['./add-queue.component.scss'],
})
export class AddQueueComponent implements OnInit {
  @Input() participants!: UserDetailsDto[];
  @Output() addQueue: EventEmitter<AddQueue[]> = new EventEmitter<AddQueue[]>();
  newQueue: AddQueue[] = [];
  match!: DartsLeg;
  cheating: boolean = false;
  hit = 'assets/img/dart/dart-hit.png';
  miss = 'assets/img/dart/dart-miss.png';

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.participants = this.dialogConfig.data['match'].participants;
    this.match = this.dialogConfig.data['match'];
    this.newQueue = this.participants.map(() => ({
      score: 0,
      blanks: 0,
    }));
  }

  onSubmit() {
    this.newQueue.forEach((player, index) => {
      if (
        player.score > (3 - player.blanks) * 60 ||
        player.score > this.match.pointsLeftInLeg[index]
      ) {
        this.cheating = true;
      }
      if (player.score === 0) {
        player.blanks = 3;
      }
    });
    if (this.cheating) {
      return;
    }

    this.dialogRef.close(this.newQueue);
  }

  handleScore(event: InputNumberInputEvent, index: number) {
    this.cheating = false;

    if (parseInt(event.value) < 0 || event.value === null) {
      event.value = '0';
      event.formattedValue = '0';
    }
    if (parseInt(event.value) > 180) {
      event.value = '180';
      event.formattedValue = '180';
    }

    this.validateEnd(parseInt(event.value), index);

    this.newQueue[index].score = parseInt(event.value);
  }

  private validateEnd(points: number, playerIndex: number) {
    if (this.match.pointsLeftInLeg[playerIndex] - points < 0) {
      this.cheating = true;
    }
  }

  finishedMatch(index: number) {
    if (this.match.pointsLeftInLeg[index] === 0) {
      return true;
    }
    return false;
  }

  hitOrMiss(event: MouseEvent, index: number) {
    const target = event.target as HTMLImageElement;
    this.cheating = false;

    if (target.src.includes('hit')) {
      target.src = this.miss;
      this.newQueue[index].blanks++;
    } else {
      target.src = this.hit;
      this.newQueue[index].blanks--;
    }
  }
}
