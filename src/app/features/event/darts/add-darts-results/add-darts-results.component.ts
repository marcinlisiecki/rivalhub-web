import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventType } from '@app/core/interfaces/event/event-type';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { EventsService } from '@app/core/services/events/events.service';
import { LanguageService } from '@app/core/services/language/language.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddDartsLeg } from '@app/core/interfaces/event/games/darts/add-darts-leg';
import { AddDartMatch } from '@app/core/interfaces/event/games/darts/add-dart-match';
import { CreatedDartsMatch } from '@app/core/interfaces/event/games/darts/created-darts-match';
import { DartsLeg } from '@app/core/interfaces/event/games/darts/dart-leg';
import { FakeDartsLeg } from '@app/core/interfaces/event/games/darts/fake-darts-leg';

@Component({
  selector: 'app-add-darts-results',
  templateUrl: './add-darts-results.component.html',
  styleUrls: ['./add-darts-results.component.scss'],
})
export class AddDartsResultsComponent implements OnInit {
  @Input() editable: boolean = true;

  matches: DartsLeg[] = [];
  eventUsers: UserDetailsDto[] = [];
  showAddNewMatch: boolean = false;

  organizationId!: number;
  eventId!: number;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.organizationId = this.route.snapshot.params['organizationId'];
    this.eventId = this.route.snapshot.params['eventId'];
    this.fetchMatches();
    this.fetchEventUsers();
  }

  fetchMatches() {
    this.eventsService
      .getEventMatches<FakeDartsLeg[]>(
        this.organizationId,
        this.eventId,
        EventType.DARTS,
      )
      .subscribe({
        next: (matches) => {
          this.matches = this.eventsService.mapDartsMatches(matches);
        },
      });
  }

  fetchEventUsers() {
    this.eventsService.getEventUsers(this.eventId, EventType.DARTS).subscribe({
      next: (users: UserDetailsDto[]) => {
        this.eventUsers = users;
      },
    });
  }

  handleAddMatch(newMatch: AddDartMatch) {
    this.eventsService
      .addDartsMatch(this.organizationId, this.eventId, newMatch)
      .subscribe({
        next: (res: CreatedDartsMatch) => {
          this.eventsService
            .createDartsLeg(this.organizationId, this.eventId, res.id)
            .subscribe({
              next: (leg: FakeDartsLeg) => {
                this.showAddNewMatch = false;
                const mapped: DartsLeg = this.eventsService.mapDartsMatch(leg);
                this.matches.push(mapped);
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
