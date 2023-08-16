import { Component, Input } from '@angular/core';
import { FileSelectEvent } from 'primeng/fileupload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { Router } from '@angular/router';
import { extractMessage } from '@app/core/utils/apiErrors';
import { NewOrganization } from '@interfaces/organization/new-organization';
import { Organization } from '@interfaces/organization/organization';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
})
export class AddOrganizationComponent {
  uploadedFile: File | undefined;
  imageURL: string = 'assets/img/avatars/avatarplaceholder.png';
  error: string | undefined;

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

  onFileSelectClicked(event: FileSelectEvent) {
    this.uploadedFile = event.files[0];
    this.imageURL = URL.createObjectURL(event.currentFiles[0]);
  }

  onClearClicked(event: Event) {
    this.imageURL = 'assets/img/avatars/avatarplaceholder.png';
    this.uploadedFile = undefined;
  }

  onSubmit() {
    this.apiError = null;

    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    URL.revokeObjectURL(this.imageURL);

    const newOrganization: NewOrganization = {
      name: this.name?.value || '',
    };

    this.organizationService.add(newOrganization).subscribe({
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

  protected readonly subscribeOn = subscribeOn;
}
