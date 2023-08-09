import { Component, EventEmitter, Output } from '@angular/core';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';

@Component({
  selector: 'app-add-user-ping-pong',
  templateUrl: './add-user-ping-pong.component.html',
  styleUrls: ['./add-user-ping-pong.component.scss'],
})
export class AddUserPingPongComponent {
  @Output() setFormStep: EventEmitter<AddEventFormStep> =
    new EventEmitter<AddEventFormStep>();

  protected readonly AddEventFormStep = AddEventFormStep;
}
