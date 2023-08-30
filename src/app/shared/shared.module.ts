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
import { VerifyAccountInfoComponent } from './verify-account-info/verify-account-info.component';
import { NoResourceInfoComponent } from './no-resource-info/no-resource-info.component';
import { AccordionModule } from 'primeng/accordion';
import { EventResultComponent } from './event-result/event-result.component';
import { PingPingResultComponent } from './event-result/ping-ping-result/ping-ping-result.component';
import { EventWaitingComponent } from './event-result/event-waiting/event-waiting.component';
import { OrganizationBackButtonComponent } from './organization-back-button/organization-back-button.component';
import { EventCardComponent } from './event-card/event-card.component';
import { TagModule } from 'primeng/tag';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from './avatar/avatar.component';
import { GoBackButtonComponent } from './go-back-button/go-back-button.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
    ValidationErrorComponent,
    CategoryStationsSelectorComponent,
    NoAvailableStationsComponent,
    CenteredSpinnerComponent,
    VerifyAccountInfoComponent,
    NoResourceInfoComponent,
    EventResultComponent,
    PingPingResultComponent,
    EventWaitingComponent,
    OrganizationBackButtonComponent,
    EventCardComponent,
    AvatarComponent,
    GoBackButtonComponent,
    PageNotFoundComponent,
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
    VerifyAccountInfoComponent,
    NoResourceInfoComponent,
    EventResultComponent,
    OrganizationBackButtonComponent,
    EventCardComponent,
    AvatarComponent,
    GoBackButtonComponent,
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
    AccordionModule,
    TagModule,
    TranslateModule,
    RouterLink,
    AngularSvgIconModule,
  ],
})
export class SharedModule {}
