import { Component } from '@angular/core';
import {
  AvailableEvent,
  AvailableEvents,
  EventType,
} from '../../../core/interfaces/event';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
})
export class NewEventComponent {
  events: AvailableEvent[] = AvailableEvents;
  selectedEvent: EventType | null = null;

  selectEvent(eventType: EventType) {
    this.selectedEvent = eventType;
  }
}
