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
import { SidebarModule } from 'primeng/sidebar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AnimateModule } from 'primeng/animate';
import { CategoryStationsSelectorComponent } from './category-stations-selector/category-stations-selector.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { NoAvailableStationsComponent } from './no-available-stations/no-available-stations.component';
import { CenteredSpinnerComponent } from './centered-spinner/centered-spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    ValidationErrorComponent,
    CategoryStationsSelectorComponent,
    NoAvailableStationsComponent,
    CenteredSpinnerComponent,
  ],
  exports: [
    ValidationErrorComponent,
    CardModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    DividerModule,
    FileUploadModule,
    ImageModule,
    CategoryStationsSelectorComponent,
    SidebarModule,
    ToggleButtonModule,
    AnimateModule,
    CenteredSpinnerComponent,
    NoAvailableStationsComponent,
    LayoutModule,
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
    SidebarModule,
    ToggleButtonModule,
    AnimateModule,
    CheckboxModule,
    FormsModule,
    ProgressSpinnerModule,
    LayoutModule,
  ],
})
export class SharedModule {}
