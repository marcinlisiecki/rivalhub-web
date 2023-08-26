import { Component, Input, OnInit } from '@angular/core';

import { Reservation } from '@interfaces/reservation/reservation';
import { EventDto } from '@interfaces/event/event-dto';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { DISPLAY_DATE_FORMAT } from '@app/core/constants/date';
import { EventsService } from '@app/core/services/events/events.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-activities-panel',
  templateUrl: './dashboard-activities-panel.component.html',
  styleUrls: ['./dashboard-activities-panel.component.scss'],
})
export class DashboardActivitiesPanelComponent implements OnInit {
  @Input({ required: true }) reservations!: Reservation[];
  @Input({ required: true }) events!: EventDto[];

  organizationId!: number;
  paramsSubscription?: Subscription;
  toastLifeTime: number = 3 * 1000;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private messageService: MessageService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe({
      next: (params: Params) => {
        this.organizationId = params['id'];
      },
    });
  }

  joinEvent(event: EventDto) {
    this.eventService.joinEvent(event.eventId, event.eventType).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          life: this.toastLifeTime,
          detail: 'Dołączyłeś do wydarzenia.',
        });
        event.participants.push(this.authService.getUserId()!);
      },
    });
  }

  canJoin(event: EventDto): boolean {
    return (
      event.eventPublic &&
      !event.participants.includes(this.authService.getUserId()!)
    );
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
  protected readonly DISPLAY_DATE_FORMAT = DISPLAY_DATE_FORMAT;
}
