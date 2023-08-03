import { Component } from '@angular/core';
import {
  AvailableEvent,
  AvailableEvents,
  EventType,
} from '../../../core/interfaces/event';
import { DialogService } from 'primeng/dynamicdialog';
import { AddReservationComponent } from '../../reservation/add-reservation/add-reservation.component';
import { Station } from '../../../core/interfaces/Station';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
  providers: [DialogService],
})
export class NewEventComponent {
  events: AvailableEvent[] = AvailableEvents;
  selectedEvent: EventType | null = null;
  reservedStations: Station[] = [];

  constructor(private dialogService: DialogService) {}

  selectEvent(eventType: EventType) {
    this.selectedEvent = eventType;
  }

  openReservationMenu() {
    this.dialogService
      .open(AddReservationComponent, {
        data: {
          isInModal: true,
        },
        header: 'Dodawanie rezerwacji',
        showHeader: true,
        contentStyle: { overflow: 'auto' },
      })
      .onClose.subscribe((stations: Station[]) => {
        if (!stations) {
          return;
        }

        this.reservedStations = stations;
      });
  }
}
