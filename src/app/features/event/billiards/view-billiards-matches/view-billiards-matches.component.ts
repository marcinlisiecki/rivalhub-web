import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BilliardsMatch } from '@interfaces/event/games/billiards/billiards-match';
import { EventType } from '@interfaces/event/event-type';
import { LanguageService } from '@app/core/services/language/language.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { WinType } from '@interfaces/event/games/billiards/billiards-win-type';

@Component({
  selector: 'app-view-billiards-matches',
  templateUrl: './view-billiards-matches.component.html',
  styleUrls: ['./view-billiards-matches.component.scss'],
})
export class ViewBilliardsMatchesComponent {
  @Input({ required: true }) matches!: BilliardsMatch[];
  @Input() editable: boolean = false;

  @Output() approveMatch: EventEmitter<number> = new EventEmitter<number>();

  loggedInUserId!: number;

  constructor(
    public languageService: LanguageService,
    private authService: AuthService,
  ) {
    this.loggedInUserId = authService.getUserId() as number;
  }

  protected readonly WinType = WinType;
}
