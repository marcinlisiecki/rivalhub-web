import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [ValidationErrorComponent],
  exports: [
    ValidationErrorComponent,
    CardModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    DividerModule,
    FileUploadModule,
    ImageModule,
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    DividerModule,
    FileUploadModule,
    ImageModule,
  ],
})
export class SharedModule {}
