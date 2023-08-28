import { Component, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditUser } from '@app/core/interfaces/user/edit-user';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { AuthService } from '@app/core/services/auth/auth.service';
import { ErrorsService } from '@app/core/services/errors/errors.service';
import { ImageService } from '@app/core/services/image/image.service';
import { UsersService } from '@app/core/services/users/users.service';
import { extractMessage } from '@app/core/utils/apiErrors';
import { MessageService } from 'primeng/api';
import { FileSelectEvent } from 'primeng/fileupload';
import { LanguageService } from '@app/core/services/language/language.service';

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
  toastLifeTime: number = 3 * 1000;

  editForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(256),
    ]),
  });
  apiError: null | string = null;
  isLoading: boolean = false;
  @ViewChild('fileupload') fileUpload!: any;

  constructor(
    private userService: UsersService,
    private imageService: ImageService,
    private errorsService: ErrorsService,
    private renderer: Renderer2,
    private messageService: MessageService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
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

    this.editProfile();

    this.isLoading = false;
  }

  private fetchUserData() {
    this.userService.getMe().subscribe((user: UserDetailsDto) => {
      this.user = user;
      this.imageURL = this.imageService.getUserImagePath(
        user.profilePictureUrl,
      );
      if (this.imageURL !== this.DEFAULTUSERAVATAR) {
        this.onAvatarLoaded();
        this.customAvatar = true;
      }
      this.editForm.get('userName')?.setValue(user.name);
    });
  }

  private editMe() {
    const editUser: EditUser = {
      name: this.editForm.get('userName')?.value!,
    };
    this.userService.editMe(editUser).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          life: this.toastLifeTime,
          summary: this.languageService.instant('organization.userEditSaved'),
        });
      },
      error: (err) => {
        this.errorsService.createErrorMessage(extractMessage(err));
        this.isLoading = false;
      },
    });
  }

  private editProfile() {
    this.userService
      .editMyAvatar(this.customAvatar, this.uploadedFile)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            life: this.toastLifeTime,
            summary: this.languageService.instant('organization.avatarSaved'),
          });
          this.editMe();
        },
        error: (err) => {
          this.errorsService.createErrorMessage(extractMessage(err));
          this.isLoading = false;
        },
      });
  }

  private onAvatarLoaded() {
    const element =
      this.fileUpload.el.nativeElement.querySelectorAll('[disabled]')[0];
    this.renderer.removeAttribute(element, 'disabled');
    this.renderer.removeClass(element, 'p-disabled');
  }

  joinAcceptableImageTypes() {
    return this.ACCEPTEDFILETYPES.join(',');
  }

  get userName() {
    return this.editForm.get('userName');
  }

  public readonly DEFAULTUSERAVATAR = this.imageService.DEFAULTUSERAVATAR;
}
