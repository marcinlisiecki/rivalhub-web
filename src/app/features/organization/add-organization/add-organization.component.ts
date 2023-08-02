import { Component, Input } from '@angular/core';
import { FileSelectEvent } from 'primeng/fileupload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs';

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

  onFileSelectClicked(event: FileSelectEvent) {
    this.uploadedFile = event.files[0];
    this.imageURL = URL.createObjectURL(event.currentFiles[0]);
    console.log(this.imageURL);
  }

  onClearClicked(event: Event) {
    this.imageURL = 'assets/img/avatars/avatarplaceholder.png';
    this.uploadedFile = undefined;
  }

  onSubmit() {
    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      return;
    }

    URL.revokeObjectURL(this.imageURL);

    //handle sending data to backend
  }

  get name() {
    return this.addForm.get('name');
  }

  protected readonly subscribeOn = subscribeOn;
}
