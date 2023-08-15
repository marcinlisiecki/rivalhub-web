import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '@app/features/profile/profile.component';
import { DashboardComponent } from '@app/features/profile/dashboard/dashboard.component';
import { DashboardActivitiesComponent } from '@app/features/profile/dashboard-activities-panel/dashboard-activities.component';
import { ActivityComponent } from '@app/features/profile/dashboard-activities-panel/activity-item/activity.component';
import { DashboardHistoryComponent } from '@app/features/profile/dashboard-history-panel/dashboard-history.component';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    DashboardActivitiesComponent,
    ActivityComponent,
    DashboardHistoryComponent,
  ],
  imports: [CommonModule, ButtonModule, SharedModule],
})
export class ProfileModule {}
