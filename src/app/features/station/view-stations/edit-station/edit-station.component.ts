import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditStation } from '@app/core/interfaces/station/edit-station';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { EventType } from '@interfaces/event/event-type';
@Component({
  selector: 'app-edit-station, [app-edit-station]',
  templateUrl: './edit-station.component.html',
  styleUrls: ['./edit-station.component.scss'],
})
export class EditStationComponent {
  @Input() station!: EditStation;
  @Output() cancelEditEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public stationType = Object.keys(EventType);
  selectedOption = this.stationType[0];

  toggleActive(state: boolean) {
    this.station.active = !state;
    console.log(this.station.active);
  }
  onSend(id: number) {
    console.log(this.station);
    console.log(this.station.active);
  }
  onCancel() {
    this.cancelEditEvent.emit(false);
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
