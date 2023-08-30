import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddDartMatch } from '@app/core/interfaces/event/games/darts/add-dart-match';
import { AddDartsLeg } from '@app/core/interfaces/event/games/darts/add-darts-leg';
import {
  DARTSFORMATS,
  DARTSMODES,
} from '@app/core/interfaces/event/games/darts/dart-consts';
import { DartFormat } from '@app/core/interfaces/event/games/darts/dart-format';
import { DartMode } from '@app/core/interfaces/event/games/darts/dart-mode';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { EventsService } from '@app/core/services/events/events.service';

@Component({
  selector: 'app-add-leg',
  templateUrl: './add-leg.component.html',
  styleUrls: ['./add-leg.component.scss'],
})
export class AddLegComponent implements OnInit {
  @Input() participants!: UserDetailsDto[];

  @Output() addMatch: EventEmitter<AddDartMatch> =
    new EventEmitter<AddDartMatch>();

  dartModes: { label: string; value: DartMode }[] = DARTSMODES;
  dartFormats: { label: string; value: DartFormat }[] = DARTSFORMATS;
  dartMode: DartMode = DartMode.None;
  dartFormat = DartFormat._301;

  organizationId!: number;
  eventId!: number;

  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.params['organizationId'];
    this.eventId = this.route.snapshot.params['eventId'];
  }
  handleAddMatch() {
    const newLeg: AddDartMatch = {
      team1Ids: this.participants.map((p) => p.id),
      dartFormat: this.dartFormat,
      dartMode: this.dartMode,
    };
    this.addMatch.emit(newLeg);
  }
}
