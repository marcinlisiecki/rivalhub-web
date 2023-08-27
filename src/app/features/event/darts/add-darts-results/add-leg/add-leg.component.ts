import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddDartsLeg } from '@app/core/interfaces/event/games/darts/add-darts-leg';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { EventsService } from '@app/core/services/events/events.service';

@Component({
  selector: 'app-add-leg',
  templateUrl: './add-leg.component.html',
  styleUrls: ['./add-leg.component.scss'],
})
export class AddLegComponent implements OnInit {
  @Input() participants!: UserDetailsDto[];

  @Output() addLeg: EventEmitter<AddDartsLeg> = new EventEmitter<AddDartsLeg>();
  dartRule = 'none';
  dartRules: any[] = [
    { label: '---', value: 'none' },
    { label: 'Double In', value: 'doubleIn' },
    { label: 'Double Out', value: 'doubleOut' },
    { label: 'Double In and Out', value: 'doubleInAndOut' },
  ];
  dartFormat = '301';
  dartFormats: any[] = [
    { label: '301', value: '301' },
    { label: '501', value: '501' },
    { label: '701', value: '701' },
    { label: '901', value: '901' },
  ];

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
    const newLeg: AddDartsLeg = {
      DartFormat: this.dartFormat,
      DartRule: this.dartRule,
      Participants: this.participants,
    };
    this.addLeg.emit(newLeg);
  }
}
