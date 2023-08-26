import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { EventDto } from '@interfaces/event/event-dto';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { DISPLAY_DATE_FORMAT } from '@app/core/constants/date';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent implements OnInit {
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
