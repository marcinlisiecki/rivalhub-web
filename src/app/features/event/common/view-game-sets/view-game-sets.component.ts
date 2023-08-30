import { Component, Input } from '@angular/core';
import { GameSet } from '@interfaces/event/games/game-set';
import { DeleteSetEvent } from '@interfaces/event/delete-set-event';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LanguageService } from '@app/core/services/language/language.service';
import { EventsService } from '@app/core/services/events/events.service';
import { TOAST_LIFETIME } from '@app/core/constants/messages';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorsService } from '@app/core/services/errors/errors.service';
import { extractMessage } from '@app/core/utils/apiErrors';
import { EventType } from '@interfaces/event/event-type';

@Component({
  selector: 'app-view-game-sets',
  templateUrl: './view-game-sets.component.html',
  styleUrls: ['./view-game-sets.component.scss'],
})
export class ViewGameSetsComponent {
  @Input({ required: true }) gameSets!: GameSet[];
  @Input() matchId!: number;
  @Input() editable: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private languageService: LanguageService,
    private eventsService: EventsService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private errorsService: ErrorsService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  deleteGameSet(deleteSetEvent: DeleteSetEvent) {
    this.confirmationService.confirm({
      target: deleteSetEvent.event.target as EventTarget,
      acceptLabel: this.languageService.instant('common.yes'),
      rejectLabel: this.languageService.instant('common.no'),
      icon: 'pi pi-exclamation-triangle',
      message: this.languageService.instant('event.set.deleteQuestion'),
      accept: () => {
        const organizationId = this.route.snapshot.params['organizationId'];
        const eventId = this.route.snapshot.params['eventId'];
        const eventType: EventType = this.route.snapshot.params['type'];

        this.eventsService
          .removePingPongOrTableFootballMatchSet(
            organizationId,
            eventId,
            this.matchId,
            deleteSetEvent.gameSet,
            eventType === EventType.PING_PONG ? 'pingpong' : 'tablefootball',
          )
          .subscribe({
            next: () => {
              this.router.navigateByUrl(this.router.url).then();

              this.messageService.add({
                severity: 'success',
                life: TOAST_LIFETIME,
                summary: this.languageService.instant(
                  'event.set.deleteConfirmation',
                ),
              });
            },
            error: (err: HttpErrorResponse) => {
              this.errorsService.createErrorMessage(extractMessage(err));
            },
          });
      },
      reject: () => {},
    });
  }
}
