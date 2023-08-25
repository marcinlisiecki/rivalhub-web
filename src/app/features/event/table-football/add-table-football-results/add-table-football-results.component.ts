import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventType } from '@interfaces/event/event-type';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute } from '@angular/router';
import { AddGameSetComponent } from '@app/features/event/common/add-game-set/add-game-set.component';
import { NewGameSet } from '@interfaces/event/games/new-game-set';
import { TableFootballMatch } from '@interfaces/event/games/table-football/table-football-match';
import { AddTableFootballMatch } from '@interfaces/event/games/table-football/add-table-football-match';

@Component({
  selector: 'app-add-table-football-results',
  templateUrl: './add-table-football-results.component.html',
  styleUrls: ['./add-table-football-results.component.scss'],
})
export class AddTableFootballResultsComponent {
  @Input() editable: boolean = true;

  matches: TableFootballMatch[] = [];
  addSetDialogRef?: DynamicDialogRef;

  organizationId!: number;
  eventId!: number;

  showAddNewMatch: boolean = false;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.params['organizationId'];
    this.eventId = this.route.snapshot.params['eventId'];

    this.eventsService
      .getEventMatches<TableFootballMatch[]>(
        this.organizationId,
        this.eventId,
        EventType.TABLE_FOOTBALL,
      )
      .subscribe({
        next: (matches: TableFootballMatch[]) => {
          this.matches = matches;
        },
      });
  }

  handleAddMatch(data: AddTableFootballMatch) {
    this.eventsService
      .addTableFootballMatch(data.organizationId, data.eventId, data.match)
      .subscribe({
        next: (_) => {
          this.eventsService
            .getEventMatches<TableFootballMatch[]>(
              this.organizationId,
              this.eventId,
              EventType.TABLE_FOOTBALL,
            )
            .subscribe({
              next: (matches: TableFootballMatch[]) => {
                this.matches = matches;
              },
            });

          this.showAddNewMatch = false;
        },
      });
  }

  openAddSetDialog(matchId: number) {
    const matchIndex = this.matches.findIndex((item) => item.id === matchId);
    this.matches[matchIndex].sets = this.matches[matchIndex].sets || [];
    this.addSetDialogRef = this.dialogService.open(AddGameSetComponent, {
      header: 'Dodaj set',
      width: '25rem',
      data: {
        matchId,
        setNr:
          this.matches[matchIndex].sets.sort((a, b) => a.setNr - b.setNr)[
            this.matches[matchIndex].sets.length - 1
          ]?.setNr + 1 || 1,
      },
    });

    this.addSetDialogRef.onClose.subscribe((set: NewGameSet) => {
      if (set) {
        this.matches[
          this.matches.findIndex((item) => item.id === set.matchId)
        ].sets.push(set);

        this.eventsService
          .addTableFootballSet(this.organizationId, this.eventId, set.matchId, [
            set,
          ])
          .subscribe();
      }
    });
  }
}
