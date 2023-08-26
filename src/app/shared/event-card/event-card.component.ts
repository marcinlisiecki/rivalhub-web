import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventDto } from '@interfaces/event/event-dto';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { DISPLAY_DATE_FORMAT } from '@app/core/constants/date';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() event!: EventDto;
  @Input() canJoin!: boolean;

  timeDifferenceInHours!: number;
  timeDifferenceInMinutes!: number;
  organizationId!: number;

  @Output() joinEvent: EventEmitter<EventDto> = new EventEmitter<EventDto>();

  constructor(private route: ActivatedRoute) {
    this.organizationId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    const duration = moment.duration(
      moment(this.event.endTime).diff(moment(this.event.startTime)),
    );

    this.timeDifferenceInHours = parseInt(duration.asHours().toString());
    this.timeDifferenceInMinutes = duration.asMinutes() % 60;
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
  protected readonly DISPLAY_DATE_FORMAT = DISPLAY_DATE_FORMAT;
}
