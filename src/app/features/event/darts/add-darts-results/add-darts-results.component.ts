import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventType } from '@app/core/interfaces/event/event-type';
import { DartsLeg } from '@app/core/interfaces/event/games/darts/darts-leg';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { EventsService } from '@app/core/services/events/events.service';
import { LanguageService } from '@app/core/services/language/language.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MOCKLEGS, MOCKLEGS2 } from '../view-darts-matches/mock-legs';
import { AddDartsLeg } from '@app/core/interfaces/event/games/darts/add-darts-leg';

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
    this.matches = MOCKLEGS;
    // this.fetchMatches();
    this.fetchEventUsers();
  }

  fetchMatches() {
    this.eventsService
      .getEventMatches<DartsLeg[]>(
        this.organizationId,
        this.eventId,
        EventType.DARTS,
      )
      .subscribe({
        next: (matches) => {
          this.matches = matches;
        },
      });
  }

  fetchEventUsers() {
    this.eventsService.getEventUsers(this.eventId, EventType.DARTS).subscribe({
      next: (users: UserDetailsDto[]) => {
        this.eventUsers = users;
        this.matches[0].participants = users;
      },
    });
  }

  handleAddLeg(leg: AddDartsLeg) {
    this.matches.push({
      legid: 0,
      dartFormat: leg.DartFormat,
      dartRule: leg.DartRule,
      participants: leg.Participants,
      queue: [
        {
          queueid: 0,
          score: [],
          bounceOuts: [],
        },
      ],
    });
    this.showAddNewMatch = false;
  }
}
