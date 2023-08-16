import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventType } from '@interfaces/event/event-type';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AVAILABLE_EVENTS } from '@app/core/constants/event';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableEvent } from '@interfaces/event/available-event';
import { AddEventFormStep } from '@interfaces/event/add-event-form-step';
import { Station } from '@interfaces/station/station';
import { Subscription } from 'rxjs';
import { StationsService } from '@app/core/services/stations/stations.service';
import { AddEventUser } from '@interfaces/event/add-event-user';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { PagedResponse } from '@interfaces/generic/paged-response';
import { AuthService } from '@app/core/services/auth/auth.service';
import { LanguageService } from '@app/core/services/language/language.service';
import { EventsService } from '@app/core/services/events/events.service';
import { AddEvent } from '@interfaces/event/add-event';
import { extractMessage } from '@app/core/utils/apiErrors';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
  providers: [DialogService],
})
export class NewEventComponent implements OnInit, OnDestroy {
  formStep: AddEventFormStep = AddEventFormStep.CATEGORY;
  formSteps: MenuItem[] = [];
  formStepIndex: number = 0;
  isChallenge: boolean = false;

  events: AvailableEvent[] = AVAILABLE_EVENTS;
  selectedEventType: EventType | null = null;

  stations: Station[] | null = null;
  selectedStations: string[] = [];

  dateError: string | null = null;

  teams: AddEventUser[][] = [[], []];

  userList: UserDetailsDto[] = [];
  notAddedUserList: UserDetailsDto[] = [];

  onLangChangeSub?: Subscription;

  newEvent!: AddEvent;

  basicInfoForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    description: new FormControl('', [Validators.maxLength(1000)]),
  });

  dateForm: FormGroup = new FormGroup({
    startDate: new FormControl<Date>(new Date(), [Validators.required]),
    endDate: new FormControl<Date>(
      new Date(new Date().setHours(new Date().getHours() + 1)),
      [Validators.required],
    ),
  });

  constructor(
    private eventsService: EventsService,
    private stationsService: StationsService,
    private organizationsService: OrganizationsService,
    private route: ActivatedRoute,
    // private translateService: TranslateService,
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    if (
      this.authService.getUserName() === null ||
      this.authService.getUserId() === null
    ) {
      this.router.navigateByUrl('/login').then();
      return;
    }

    this.teams[0].push({
      id: this.authService.getUserId() || 0,
      name: this.authService.getUserName() || '',
    });

    const challengeId = this.route.snapshot.queryParams['challengeId'];
    const challengeName = this.route.snapshot.queryParams['challengeName'];
    if (
      challengeId &&
      challengeName &&
      challengeId !== this.authService.getUserId()
    ) {
      this.isChallenge = true;
      this.teams[1].push({
        id: parseInt(challengeId),
        name: challengeName,
      });
    }

    setTimeout(() => this.setStepsMenu(), 100);
    this.onLangChangeSub = this.languageService.onLangChange.subscribe(() =>
      this.setStepsMenu(),
    );

    this.fetchUserList();
  }

  handleAddUser(data?: { user?: AddEventUser; teamIndex?: number }) {
    if (!data || !data.user || data.teamIndex === undefined) {
      return;
    }

    this.teams[data.teamIndex].push(data.user);
    this.notAddedUserList = this.getOnlyNotAddedUserList();
  }

  handleRemoveUser(data?: { user?: AddEventUser; teamIndex?: number }) {
    if (!data || !data.user || data.teamIndex === undefined) {
      return;
    }

    this.teams[data.teamIndex] = this.teams[data.teamIndex].filter(
      (item) => item.id !== data?.user?.id,
    );
    this.notAddedUserList = this.getOnlyNotAddedUserList();
  }

  fetchUserList() {
    const organizationId = this.route.snapshot.params['id'];

    this.organizationsService.getUsers(organizationId, 0, 1000).subscribe({
      next: (res: PagedResponse<UserDetailsDto>) => {
        this.userList = res.content;
        this.notAddedUserList = this.getOnlyNotAddedUserList();
      },
    });
  }

  getOnlyNotAddedUserList() {
    let notAddedList: UserDetailsDto[] = [];

    this.userList.forEach((user) => {
      let found: boolean = false;

      this.teams.forEach((team) => {
        if (team.findIndex((item) => item.id === user.id) !== -1) {
          found = true;
        }
      });

      if (!found) {
        notAddedList.push(user);
      }
    });

    return notAddedList;
  }

  ngOnDestroy(): void {
    this.onLangChangeSub?.unsubscribe();
  }

  setStepsMenu() {
    this.formSteps = [
      {
        label: this.languageService.instant('event.new.steps.category'),
      },
      {
        label: this.languageService.instant('event.new.steps.info'),
      },
      {
        label: this.languageService.instant('event.new.steps.addUsers'),
      },
      {
        label: this.languageService.instant('event.new.steps.date'),
      },
      {
        label: this.languageService.instant('event.new.steps.reservation'),
      },
    ];
  }

  getOnlyCategoryStations(): Station[] | null {
    return (
      this.stations?.filter(
        (station) => station.type === this.selectedEventType,
      ) || null
    );
  }

  validateDates(): boolean {
    const startDate: Date = this.dateForm.get('startDate')?.value;
    const endDate: Date = this.dateForm.get('endDate')?.value;

    if (startDate.getTime() > endDate.getTime()) {
      this.dateError = 'Godzina startowa musi być przed godziną zakończenia';
      return false;
    }

    return true;
  }

  fetchAvailableStations() {
    this.stations = null;

    const startDate = this.dateForm.get('startDate')?.value;
    const endDate = this.dateForm.get('endDate')?.value;

    const organizationId: number = this.route.snapshot.params['id'];

    if (this.selectedEventType === null) {
      return;
    }

    setTimeout(() => {
      if (this.selectedEventType === null) {
        return;
      }

      this.stationsService
        .getAvailableStations(
          organizationId,
          startDate,
          endDate,
          this.selectedEventType,
        )
        .subscribe({
          next: (stations: Station[]) => {
            this.stations = stations;
          },
        });
    }, 1000);
  }

  toggleSelectedStation(idNumber: number) {
    const id = idNumber.toString();

    if (this.selectedStations.includes(id)) {
      this.selectedStations.splice(this.selectedStations.indexOf(id), 1);
      return;
    }

    this.selectedStations.push(id);
  }

  setFormStep(nextStep: AddEventFormStep): void {
    if (nextStep === AddEventFormStep.RESERVATION && !this.validateDates()) {
      return;
    }

    if (nextStep === AddEventFormStep.RESERVATION) {
      this.fetchAvailableStations();
      this.selectedStations = [];
    }

    this.formStepIndex = nextStep;
    this.formStep = nextStep;
  }

  selectEvent(eventType: EventType): void {
    this.selectedStations = [];
    this.selectedEventType = eventType;
  }

  buildEvent() {
    let startTime = this.dateForm.get('startDate')?.value;
    let endTime = this.dateForm.get('endDate')?.value;
    let name = this.basicInfoForm.get('name')?.value;
    let description = this.basicInfoForm.get('description')?.value;

    let hostId = 0;
    //TODO Refactor tego potrzebny będzie
    if (this.teams.at(0)) {
      let itemList: AddEventUser[] = this.teams.at(0) as AddEventUser[];
      if (itemList.at(0)) {
        let item = itemList.at(0);
        if (item) hostId = item.id;
      }
    }

    let dane: number[] = [];
    let teams: number[][] = Array.from({ length: this.teams.length }, () => []);
    let actualNumberOfParticipants: number = 0;
    let currentTeam = 0;
    for (const team of this.teams) {
      if (team) {
        const itemList: AddEventUser[] = team as AddEventUser[];

        itemList.forEach((item) => {
          if (item) {
            teams[currentTeam].push(item.id);
            dane.push(item.id);
            actualNumberOfParticipants++;
          }
        });
      }
      currentTeam++;
    }

    let newEventstationList = this.selectedStations.map((item) =>
      parseFloat(item),
    );
    this.newEvent = {
      endTime: endTime,
      host: hostId,
      participants: dane,
      startTime: startTime,
      stationList: newEventstationList,
      name: name,
      description: description,
      team1: teams[0],
      team2: teams[1],
    };
  }
  addEvent() {
    this.buildEvent();
    const organizationId: number = this.route.snapshot.params['id'];
    console.log(this.selectedEventType);
    this.eventsService
      .addEvent(this.newEvent, organizationId, this.selectedEventType!)
      .subscribe({
        next: () => {
          this.router.navigateByUrl(`/organizations/${organizationId}`).then();
        },
        error: (err) => {
          //TODO obsułga błedu
        },
      });
    console.log('poserwisie');
  }

  protected readonly AddEventFormStep = AddEventFormStep;
  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
