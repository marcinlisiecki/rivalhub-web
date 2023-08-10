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
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AddEventUser } from '@interfaces/event/add-event-user';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { PagedResponse } from '@interfaces/generic/paged-response';
import { AuthService } from '@app/core/services/auth/auth.service';

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

  events: AvailableEvent[] = AVAILABLE_EVENTS;
  selectedEventType: EventType | null = null;

  stations: Station[] | null = null;
  selectedStations: string[] = [];

  dateError: string | null = null;

  teams: AddEventUser[][] = [[], []];

  userList: UserDetailsDto[] = [];
  notAddedUserList: UserDetailsDto[] = [];

  onLangChangeSub?: Subscription;

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
    private organizationService: OrganizationsService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router,
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

    this.setStepsMenu();
    this.onLangChangeSub = this.translateService.onLangChange.subscribe(() =>
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

    this.organizationService.getUsers(organizationId, 0, 1000).subscribe({
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
        label: this.translateService.instant('event.new.steps.category'),
      },
      {
        label: this.translateService.instant('event.new.steps.info'),
      },
      {
        label: this.translateService.instant('event.new.steps.addUsers'),
      },
      {
        label: this.translateService.instant('event.new.steps.date'),
      },
      {
        label: this.translateService.instant('event.new.steps.reservation'),
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

      this.organizationService
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

  protected readonly AddEventFormStep = AddEventFormStep;
  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
