import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { EventType } from '@interfaces/event/event-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { ErrorsService } from '@app/core/services/errors/errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@app/core/utils/apiErrors';
import { categoryTypeToLabel } from '@app/core/utils/event';
import { OrganizationSettings } from '@interfaces/organization/organization-settings';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileSelectEvent } from 'primeng/fileupload';
import { ImageService } from '@app/core/services/image/image.service';
import { EditOrganization } from '@app/core/interfaces/organization/edit-organization';
import { Observable, of, Subscription } from 'rxjs';
import { LanguageService } from '@app/core/services/language/language.service';
import { EventIcon } from '@interfaces/event/event-icon';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.scss'],
})
export class OrganizationSettingsComponent implements OnInit {
  possibleEventTypes: EventType[] = [];
  activeEventTypes: EventType[] = [];
  organizationId!: number;
  paramsSub?: Subscription;
  isLoading: boolean = false;
  toastLifeTime: number = 3 * 1000;

  private DEFAULTAVATAR = '/assets/img/svg/defaultOrganization.svg';
  ACCEPTEDFILETYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  MAXFILESIZE = 5242880;
  color?: string;
  uploadedFile?: File;
  imageURL: string = this.DEFAULTAVATAR;
  customAvatar!: boolean;

  clientError: string | undefined;
  apiError: null | string = null;

  editForm = new FormGroup({
    organizationName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(256),
    ]),
  });
  settingsForm: FormGroup = new FormGroup({
    onlyAdminCanSeeInvitationLink: new FormControl(true, []),
  });

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private organizationsService: OrganizationsService,
    private imageService: ImageService,
    private errorsService: ErrorsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private renderer: Renderer2,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe((params: Params) => {
      this.organizationId = params['id'];
      this.fetchAllEventTypes();
      this.fetchActiveEventTypes();
      this.fetchOrganizationsSettings();
      this.fetchOrganizationNameAndAvatar();
    });
  }

  onSave() {
    this.isLoading = true;

    this.setOrganizationEventTypes();
    this.saveOrganizationSettings();
    this.saveOrganizationDetails();
    this.saveOrganizationAvatar();
  }

  onDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      acceptLabel: this.languageService.instant('common.yes'),
      rejectLabel: this.languageService.instant('common.no'),
      icon: 'pi pi-exclamation-triangle',
      message: this.languageService.instant('organization.deleteConfQ'),
      accept: () => {
        this.organizationsService.delete(this.organizationId).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              life: this.toastLifeTime,
              summary: this.languageService.instant('organization.deleteConf'),
            });
            this.router.navigate(['organizations']);
          },
          error: () => {},
        });
      },
      reject: () => {},
    });
  }

  fetchOrganizationsSettings() {
    this.organizationsService
      .getOrganizationSettings(this.organizationId)
      .subscribe({
        next: (settings: OrganizationSettings) => {
          this.settingsForm
            .get('onlyAdminCanSeeInvitationLink')
            ?.setValue(settings.onlyAdminCanSeeInvitationLink);
        },
      });
  }

  setOrganizationEventTypes(): Observable<{}> {
    const activeEventTypes = this.activeEventTypes;
    const inactiveEventTypes = this.possibleEventTypes.filter(
      (type) => !this.activeEventTypes.includes(type),
    );

    this.eventsService
      .setOrganizationEventTypes(this.organizationId, activeEventTypes)
      .subscribe();
    this.eventsService
      .deleteOrganizationEventTypes(this.organizationId, inactiveEventTypes)
      .subscribe();
    return of({});
  }

  saveOrganizationSettings(): Observable<{}> {
    this.organizationsService
      .setOrganizationSettings(
        this.organizationId,
        this.settingsForm.get('onlyAdminCanSeeInvitationLink')?.value,
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            life: this.toastLifeTime,
            summary: this.languageService.instant('organization.settingsConf'),
          });
        },
        error: (err: HttpErrorResponse) => {
          this.errorsService.createErrorMessage(extractMessage(err));
        },
      });
    return of({});
  }
  saveOrganizationAvatar() {
    this.organizationsService
      .setOrganizationAvatar(
        this.organizationId,
        this.customAvatar,
        this.uploadedFile,
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            life: this.toastLifeTime,
            summary: this.languageService.instant('organization.avatarEdited'),
          });
        },
        error: (err: HttpErrorResponse) => {
          this.errorsService.createErrorMessage(extractMessage(err));
        },
      });
  }

  saveOrganizationDetails(): Observable<{}> {
    const editOrganization: EditOrganization = {
      name: this.editForm.get('organizationName')?.value,
      color: this.color,
    };
    this.organizationsService
      .setOrganizationNameAndColor(this.organizationId, editOrganization)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            life: this.toastLifeTime,
            summary: this.languageService.instant('organization.edited'),
          });
        },
        error: (err: HttpErrorResponse) => {
          this.errorsService.createErrorMessage(extractMessage(err));
        },
      });
    return of({});
  }

  toggleAvailableEventType(eventType: EventType) {
    if (this.activeEventTypes.includes(eventType)) {
      this.activeEventTypes = this.activeEventTypes.filter(
        (type) => type !== eventType,
      );
    } else {
      this.activeEventTypes.push(eventType);
    }
  }

  fetchAllEventTypes() {
    this.eventsService.getAllEventTypesInApp().subscribe({
      next: (types: EventType[]) => {
        this.possibleEventTypes = types;
      },
    });
  }

  fetchActiveEventTypes() {
    this.eventsService
      .getEventTypesInOrganization(this.organizationId)
      .subscribe({
        next: (types: EventType[]) => {
          this.activeEventTypes = types;
        },
      });
  }

  fetchOrganizationNameAndAvatar() {
    this.organizationsService.choose(this.organizationId).subscribe({
      next: (organization) => {
        this.color = organization.color;
        this.editForm.get('organizationName')?.setValue(organization.name);
        this.imageURL = this.imageService.getOrganizationImagePath(
          organization.imageUrl,
        );
        if (this.imageURL !== this.DEFAULTAVATAR) {
          this.customAvatar = true;
          this.onAvatarLoaded();
        }
      },
    });
  }

  onFileSelectClicked(event: FileSelectEvent) {
    this.clientError = undefined;
    if (!this.ACCEPTEDFILETYPES.includes(event.files[0].type)) {
      this.clientError = this.languageService.instant('organization.files');
      return;
    }
    if (event.files[0].size > this.MAXFILESIZE) {
      this.clientError = this.languageService.instant(
        'organization.fileToLarge',
      );
      return;
    }
    this.uploadedFile = event.files[0];
    this.imageURL = URL.createObjectURL(event.currentFiles[0]);
    this.customAvatar = true;
  }

  onClearClicked() {
    this.customAvatar = false;
    this.imageURL = this.DEFAULTAVATAR;
    this.uploadedFile = undefined;
  }

  joinAcceptableImageTypes() {
    return this.ACCEPTEDFILETYPES.join(',');
  }

  @ViewChild('fileupload') fileUpload!: any;
  onAvatarLoaded() {
    const element =
      this.fileUpload.el.nativeElement.querySelectorAll('[disabled]')[0];
    this.renderer.removeAttribute(element, 'disabled');
    this.renderer.removeClass(element, 'p-disabled');
  }

  get organizationName() {
    return this.editForm.get('organizationName');
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
  protected readonly EventIcon = EventIcon;
}
