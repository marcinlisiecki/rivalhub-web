import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { UsersService } from '@app/core/services/users/users.service';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  private DEFAULTAVATAR = '/assets/img/svg/defaultOrganization.svg';
  ACCEPTEDFILETYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  MAXFILESIZE = 5242880;
  color: string = '#4c4d87';
  uploadedFile: File | undefined;
  imageURL: string = this.DEFAULTAVATAR;
  clientError: string | undefined;
  customAvatar: boolean = true;

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
    private router: Router,
    private authService: AuthService,
  ) {}

  //Udawaj, że tego tutaj nie ma, i tak nie zrozumiesz.
  //Ale dla jasności - to jest potrzebne do tego,
  //żeby po kliknięciu na awatar pokazywał się colorpicker i chował się oryginalny guziczek.
  @ViewChild('colorPicker') colorPicker!: any;
  onImageClick() {
    this.colorPicker.el.nativeElement.childNodes[0].childNodes[0].click();
  }
  ngAfterViewInit(): void {
    this.hideInput();
  }
  //Od tego miejsca znowu jesteś w stanie zrozumieć kod.

  onFileSelectClicked(event: FileSelectEvent) {
    this.clientError = undefined;
    //check if file is type of ACCEPTEDFILETYPES
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
    this.imageURL = this.DEFAULTAVATAR;
    this.uploadedFile = undefined;
    this.hideInput();
  }

  onSubmit() {
    this.apiError = null;

    if (!this.editForm.valid) {
      this.editForm.markAllAsTouched();
      return;
    }

    //wywalić do serwisu użytkownika
    const organizationData = new FormData();
    organizationData.append('thumbnail', this.uploadedFile || '');
    organizationData.append('color', this.color);
    organizationData.append('organization', this.userName?.value || '');

    this.isLoading = true;
    URL.revokeObjectURL(this.imageURL);

    //edycja profilu użytkownika

    this.isLoading = false;
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
}
