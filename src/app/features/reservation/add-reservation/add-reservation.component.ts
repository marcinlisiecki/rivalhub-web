import { Component, inject, Input } from '@angular/core';
import { Station } from '../../../core/interfaces/Station';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventType } from '../../../core/interfaces/event';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss'],
})
export class AddReservationComponent {
  @Input() isInModal: boolean = false;

  stations: Station[] = [
    {
      id: 1,
      name: 'Stół nr 1',
      type: EventType.PING_PONG,
    },
    {
      id: 2,
      name: 'Stół nr 2',
      type: EventType.PING_PONG,
    },
    {
      id: 3,
      name: 'Stół nr 1',
      type: EventType.BILLIARDS,
    },
  ];

  types = new Set(this.stations.map((station) => station.type));
  checkboxs: Map<Station, Boolean> = new Map();
  date: any;
  startTime: any;
  finishTime: any;
  checkoutForm: any;
  invalidDate: boolean = false;
  readyDateAndValid: boolean = false;
  emptyData: boolean = false;
  today: Date = new Date();

  dialogConfig: DynamicDialogConfig | null = null;
  dialogRef: DynamicDialogRef | null = null;

  constructor() {
    try {
      this.dialogConfig = inject(DynamicDialogConfig);
      this.dialogRef = inject(DynamicDialogRef);
    } catch (e) {}

    this.stations.forEach((station) => this.checkboxs.set(station, false));
    this.isInModal = this.dialogConfig?.data?.isInModal || false;
  }

  checkValue(inputId: Station) {
    this.checkboxs.set(inputId, !(<Boolean>this.checkboxs.get(inputId)));
  }

  onSubmit() {
    if (
      this.startTime == null ||
      this.finishTime == null ||
      this.date == null
    ) {
      this.emptyData = true;
      return;
    }
    this.emptyData = false;
    if (this.startTime >= this.finishTime) {
      this.invalidDate = true;
      this.readyDateAndValid = false;
    } else {
      this.invalidDate = false;
      this.readyDateAndValid = true;
    }
    return;
  }

  onSave() {
    if (this.dialogRef) {
      const reserved: Station[] = [];

      this.checkboxs.forEach((isSelected, key: Station) => {
        if (isSelected) {
          reserved.push(key);
        }
      });

      this.dialogRef.close(reserved);
    }
  }
}
