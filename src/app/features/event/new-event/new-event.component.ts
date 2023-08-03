import { Component, OnInit } from '@angular/core';
import {
  AvailableEvent,
  AvailableEvents,
  EventType,
} from '../../../core/interfaces/event';
import { DialogService } from 'primeng/dynamicdialog';
import { AddReservationComponent } from '../../reservation/add-reservation/add-reservation.component';
import { Station } from '../../../core/interfaces/Station';
import { MenuItem } from 'primeng/api';

enum FormState {
  CATEGORY,
  BASIC_INFO,
  DATE,
  RESERVATION,
}

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
  providers: [DialogService],
})
export class NewEventComponent implements OnInit {
  events: AvailableEvent[] = AvailableEvents;
  selectedEvent: EventType | null = null;
  reservedStations: Station[] = [];
  formState: FormState = FormState.CATEGORY;
  formSteps: MenuItem[] = [];
  formStepIndex: number = 0;
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

  constructor(private dialogService: DialogService) {}

  getOnlyCategoryStations(): Station[] {
    return this.stations.filter(
      (station) => station.type === this.selectedEvent,
    );
  }

  ngOnInit(): void {
    this.formSteps = [
      {
        label: 'Kategoria',
      },
      {
        label: 'Informacje',
      },
      {
        label: 'Data i czas',
      },
      {
        label: 'Rezerwacja',
      },
    ];
  }

  setFormState(nextState: FormState) {
    this.formStepIndex = nextState;
    this.formState = nextState;
  }

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

  protected readonly FormState = FormState;
}
