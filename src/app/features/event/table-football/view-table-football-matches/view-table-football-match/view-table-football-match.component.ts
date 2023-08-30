import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PingPongMatch } from '@interfaces/event/games/ping-pong/ping-pong-match';
import { LanguageService } from '@app/core/services/language/language.service';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-view-table-football-match',
  templateUrl: './view-table-football-match.component.html',
  styleUrls: ['./view-table-football-match.component.scss'],
})
export class ViewTableFootballMatchComponent {
  @Input({ required: true }) match!: PingPongMatch;
  @Input() editable: boolean = false;

  @Output() handleAddSet: EventEmitter<number> = new EventEmitter<number>();
  @Output() approveMatch: EventEmitter<number> = new EventEmitter<number>();

  loggedInUserId!: number;

  constructor(
    public languageService: LanguageService,
    private authService: AuthService,
  ) {
    this.loggedInUserId = authService.getUserId() as number;
  }
}
