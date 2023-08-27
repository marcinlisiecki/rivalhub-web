import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameSet } from '@interfaces/event/games/game-set';
import { DeleteSetEvent } from '@interfaces/event/delete-set-event';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LanguageService } from '@app/core/services/language/language.service';
import { EventsService } from '@app/core/services/events/events.service';
import { TOAST_LIFETIME } from '@app/core/constants/messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-game-sets',
  templateUrl: './view-game-sets.component.html',
  styleUrls: ['./view-game-sets.component.scss'],
})
export class ViewGameSetsComponent {
  @Input({ required: true }) gameSets!: GameSet[];

  constructor(
    private confirmationService: ConfirmationService,
    private languageService: LanguageService,
    private eventsService: EventsService,
    private messageService: MessageService,
    private router: Router,
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
        this.gameSets = this.gameSets
          .filter((set) => set.setNr !== deleteSetEvent.gameSet.setNr)
          .map((set) => {
            if (set.setNr > deleteSetEvent.gameSet.setNr) {
              set.setNr--;
            }

            return set;
          });

        this.router.navigateByUrl(this.router.url).then();

        this.messageService.add({
          severity: 'success',
          life: TOAST_LIFETIME,
          summary: this.languageService.instant('event.set.deleteConfirmation'),
        });
      },
      reject: () => {},
    });
  }
}
