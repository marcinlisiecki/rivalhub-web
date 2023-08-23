import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FileSelectEvent } from 'primeng/fileupload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { Router } from '@angular/router';
import { extractMessage } from '@app/core/utils/apiErrors';
import { Organization } from '@interfaces/organization/organization';
import { AuthService } from '@app/core/services/auth/auth.service';
import { NewOrganization } from '@app/core/interfaces/organization/new-organization';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
})
export class AddOrganizationComponent implements AfterViewInit {
  private DEFAULTAVATAR = '/assets/img/svg/defaultOrganization.svg';
  ACCEPTEDFILETYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  MAXFILESIZE = 5242880;
  color: string = '#4c4d87';
  uploadedFile: File | undefined;
  imageURL: string = this.DEFAULTAVATAR;
  clientError: string | undefined;
  customAvatar: boolean = true;
  addForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(256),
    ]),
  });
  apiError: null | string = null;
  isLoading: boolean = false;

  constructor(
    private organizationService: OrganizationsService,
    private router: Router,
    private authService: AuthService,
  ) {}

  //Ale dla jasności - to jest potrzebne do tego,
  //żeby po kliknięciu na awatar pokazywał się colorpicker i chował się oryginalny guziczek.
  @ViewChild('colorPicker') colorPicker!: any;
  onImageClick() {
    this.colorPicker.el.nativeElement.childNodes[0].childNodes[0].click();
  }
  ngAfterViewInit(): void {
    this.hideInput();
  }

  onFileSelectClicked(event: FileSelectEvent) {
    this.clientError = undefined;
    if (!this.ACCEPTEDFILETYPES.includes(event.files[0].type)) {
      this.clientError = 'Obsługujemy tylko pliki .png, .jpg, .jpeg i .gif.';
      return;
    }
    if (event.files[0].size > this.MAXFILESIZE) {
      this.clientError = 'Plik jest za duży.';
      return;
    }

    this.uploadedFile = event.files[0];
    this.imageURL = URL.createObjectURL(event.currentFiles[0]);
    this.customAvatar = false;
  }

  onClearClicked(event: Event) {
    this.customAvatar = true;
    this.imageURL = this.DEFAULTAVATAR;
    this.uploadedFile = undefined;
    this.hideInput();
  }

  onSubmit() {
    this.apiError = null;

    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      return;
    }

    const newOrganization: NewOrganization = {
      name: this.name?.value!,
      color: this.color,
      uploadedFile: this.uploadedFile,
    };

    this.isLoading = true;
    URL.revokeObjectURL(this.imageURL);

    this.organizationService.add(newOrganization).subscribe({
      next: (organization: Organization) => {
        this.authService.refreshToken().subscribe();
        this.router
          .navigateByUrl(`/organizations/${organization.id}/configurator`)
          .then();
      },
      error: (err: unknown) => {
        this.apiError = extractMessage(err);
      },
    });

    this.isLoading = false;
  }

  joinAcceptableImageTypes() {
    return this.ACCEPTEDFILETYPES.join(',');
  }

  get name() {
    return this.addForm.get('name');
  }
  hideInput() {
    this.colorPicker.el.nativeElement.childNodes[0].childNodes[0].style.opacity = 0;
  }

  protected readonly subscribeOn = subscribeOn;
}
