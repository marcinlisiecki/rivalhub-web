import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditStation } from '@app/core/interfaces/station/edit-station';
import { categoryTypeToLabel } from '@app/core/utils/event';

@Component({
  selector: 'app-view-station, [app-view-station]',
  templateUrl: './view-station.component.html',
  styleUrls: ['./view-station.component.scss'],
})
export class ViewStationComponent {
  @Input() station!: EditStation;
  @Output() editEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  startEdit() {
    this.editEvent.emit(true);
  }
  onDelete(id: number) {}
  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
