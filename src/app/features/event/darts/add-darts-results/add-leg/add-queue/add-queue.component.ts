import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddQueue } from '@app/core/interfaces/event/games/darts/add-queue';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-queue',
  templateUrl: './add-queue.component.html',
  styleUrls: ['./add-queue.component.scss'],
})
export class AddQueueComponent implements OnInit {
  @Input() participants!: UserDetailsDto[];
  newQueue?: AddQueue[];

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
  ) {}

  onSubmit() {}
  ngOnInit(): void {
    this.newQueue = this.dialogConfig.data['newQueue'];
    console.log(this.newQueue);
  }
}
