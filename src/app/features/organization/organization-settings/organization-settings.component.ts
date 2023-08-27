import { Component, Renderer2, ViewChild } from '@angular/core';
import { EventType } from '@interfaces/event/event-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '@app/core/services/events/events.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Observable, of } from 'rxjs';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.scss'],
})
export class OrganizationSettingsComponent {
  possibleEventTypes: EventType[] = [];
  activeEventTypes: EventType[] = [];
  organizationId: number;
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
  ) {
    this.organizationId = parseInt(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.fetchAllEventTypes();
    this.fetchActiveEventTypes();
    this.fetchOrganizationsSettings();
    this.fetchOrganizationNameAndAvatar();
  }

  ngAfterViewInit(): void {
    this.hideInput();
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
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
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
    this.uploadedFile;
    this.uploadedFile = event.files[0];
    this.imageURL = URL.createObjectURL(event.currentFiles[0]);
    this.customAvatar = true;
  }

  onClearClicked() {
    this.customAvatar = false;
    this.imageURL = this.DEFAULTAVATAR;
    this.uploadedFile = undefined;
    this.hideInput();
  }

  joinAcceptableImageTypes() {
    return this.ACCEPTEDFILETYPES.join(',');
  }

  @ViewChild('colorPicker') colorPicker!: any;
  onImageClick() {
    this.colorPicker.el.nativeElement.childNodes[0].childNodes[0].click();
  }

  @ViewChild('fileupload') fileUpload!: any;
  onAvatarLoaded() {
    const element =
      this.fileUpload.el.nativeElement.querySelectorAll('[disabled]')[0];
    this.renderer.removeAttribute(element, 'disabled');
    this.renderer.removeClass(element, 'p-disabled');
  }

  hideInput() {
    this.colorPicker.el.nativeElement.childNodes[0].childNodes[0].style.opacity = 0;
  }

  get organizationName() {
    return this.editForm.get('organizationName');
  }

  protected readonly categoryTypeToLabel = categoryTypeToLabel;
}
