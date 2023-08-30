import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '@app/features/profile/profile.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardActivitiesComponent } from '@app/features/profile/dashboard-activities-panel/dashboard-activities.component';
import { ActivityComponent } from '@app/features/profile/dashboard-activities-panel/activity-item/activity.component';
import { DashboardHistoryComponent } from '@app/features/profile/dashboard-history-panel/dashboard-history.component';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '@app/shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProfileComponent,
    DashboardProfileComponent,
    DashboardActivitiesComponent,
    ActivityComponent,
    DashboardHistoryComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ColorPickerModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    RouterModule,
  ],
})
export class ProfileModule {}
