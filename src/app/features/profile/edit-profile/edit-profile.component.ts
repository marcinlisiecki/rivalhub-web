import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  color: string = '#4c4d87';
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
  @ViewChild('colorPicker') colorPicker!: any;

  constructor(
    private userService: UsersService,
    private imageService: ImageService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userService.getMe().subscribe((user: UserDetailsDto) => {
      console.log(user);
      this.user = user;
      // this.editForm.userName.setValue(user.name);
    });
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

  onClearClicked() {
    this.customAvatar = true;
    this.imageURL = this.DEFAULTUSERAVATAR;
    this.uploadedFile = undefined;
    this.hideInput();
  }

  onSubmit() {
    this.apiError = null;

    if (!this.editForm.valid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    URL.revokeObjectURL(this.imageURL);

    const editUser = {
      name: this.editForm.value.userName,
      color: this.color,
      uploadedFile: this.uploadedFile,
    };

    this.isLoading = false;
  }

  onImageClick() {
    this.colorPicker.el.nativeElement.childNodes[0].childNodes[0].click();
  }
  joinAcceptableImageTypes() {
    return this.ACCEPTEDFILETYPES.join(',');
  }

  get userName() {
    return this.editForm.get('userName');
  }
  hideInput() {
    this.colorPicker.el.nativeElement.childNodes[0].childNodes[0].style.opacity = 0;
  }

  public readonly DEFAULTUSERAVATAR = this.imageService.DEFAULTUSERAVATAR;
}
