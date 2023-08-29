import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AddQueue } from '@app/core/interfaces/event/games/darts/add-queue';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
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
  cheating: boolean = false;
  hit = 'assets/img/dart/dart-hit.png';
  miss = 'assets/img/dart/dart-miss.png';
  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
  ) {}

  onSubmit() {
    this.newQueue.forEach((player) => {
      if (player.score > (3 - player.blanks) * 60) {
        this.cheating = true;
      }
    });
    if (this.cheating) {
      return;
    }
    this.dialogRef.close(this.newQueue);
  }
  ngOnInit(): void {
    this.participants = this.dialogConfig.data['participants'];
    this.newQueue = this.participants.map(() => ({
      score: 0,
      blanks: 0,
    }));
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
    this.newQueue[index].score = parseInt(event.value);
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
