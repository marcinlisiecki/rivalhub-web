import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditUser } from '@app/core/interfaces/user/edit-user';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { AuthService } from '@app/core/services/auth/auth.service';
import { ImageService } from '@app/core/services/image/image.service';
import { UsersService } from '@app/core/services/users/users.service';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  ACCEPTEDFILETYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  MAXFILESIZE = 5242880;
  uploadedFile: File | undefined;
  imageURL: string = '';
  clientError: string | undefined;
  customAvatar: boolean = true;
  user!: UserDetailsDto;

  editForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(256),
    ]),
  });
  apiError: null | string = null;
  isLoading: boolean = false;

  constructor(
    private userService: UsersService,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.userService.getMe().subscribe((user: UserDetailsDto) => {
      this.user = user;
      this.imageURL = this.imageService.getUserImagePath(
        user.profilePictureUrl,
      );
      this.editForm.get('userName')?.setValue(user.name);
    });
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

  onClearClicked() {
    this.customAvatar = true;
    this.imageURL = this.DEFAULTUSERAVATAR;
    this.uploadedFile = undefined;
  }

  onSubmit() {
    this.apiError = null;

    if (!this.editForm.valid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    URL.revokeObjectURL(this.imageURL);

    const editUser: EditUser = {
      name: this.editForm.value.userName!,
    };

    this.userService.editMe(editUser).subscribe({});
    this.userService
      .editMyAvatar(this.customAvatar, this.uploadedFile)
      .subscribe({});

    this.isLoading = false;
  }

  joinAcceptableImageTypes() {
    return this.ACCEPTEDFILETYPES.join(',');
  }

  get userName() {
    return this.editForm.get('userName');
  }

  public readonly DEFAULTUSERAVATAR = this.imageService.DEFAULTUSERAVATAR;
}
