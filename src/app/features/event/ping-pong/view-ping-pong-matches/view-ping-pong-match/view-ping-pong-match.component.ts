import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PingPongMatch } from '@interfaces/event/games/ping-pong/ping-pong-match';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-view-ping-pong-match',
  templateUrl: './view-ping-pong-match.component.html',
  styleUrls: ['./view-ping-pong-match.component.scss'],
})
export class ViewPingPongMatchComponent {
  @Input({ required: true }) match!: PingPongMatch;
  @Input() editable: boolean = false;

  @Output() handleAddSet: EventEmitter<number> = new EventEmitter<number>();

  constructor(public languageService: LanguageService) {}
}
