import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FileSelectEvent } from 'primeng/fileupload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { Router } from '@angular/router';
import { extractMessage } from '@app/core/utils/apiErrors';
import { Organization } from '@interfaces/organization/organization';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
})
export class AddOrganizationComponent implements AfterViewInit {
  private DEFAULTAVATAR = '/assets/img/svg/defaultOrganization.svg';
  color: string = '#4c4d87';
  uploadedFile: File | undefined;
  imageURL: string = this.DEFAULTAVATAR;
  error: string | undefined;
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
  ) {}

  //Udawaj, że tego tutaj nie ma, i tak nie zrozumiesz.
  @ViewChild('colorPicker') colorPicker!: any;
  onImageClick() {
    this.colorPicker.el.nativeElement.childNodes[0].childNodes[0].click();
  }
  ngAfterViewInit(): void {
    this.hideInput();
  }
  //Od tego miejsca znowu jesteś w stanie zrozumieć kod.

  onFileSelectClicked(event: FileSelectEvent) {
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

    const organizationData = new FormData();
    organizationData.append('thumbnail', this.uploadedFile || '');
    organizationData.append('color', this.color);
    organizationData.append(
      'organization',
      JSON.stringify(this.name?.value || ''),
    );

    this.isLoading = true;
    URL.revokeObjectURL(this.imageURL);

    this.organizationService.add(organizationData).subscribe({
      next: (organization: Organization) => {
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

  get name() {
    return this.addForm.get('name');
  }
  hideInput() {
    this.colorPicker.el.nativeElement.childNodes[0].childNodes[0].style.opacity = 0;
  }

  protected readonly subscribeOn = subscribeOn;
}
