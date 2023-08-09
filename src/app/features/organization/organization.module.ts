import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationDashboardComponent } from '@app/features/organization/organization-dashboard/organization-dashboard.component';
import { DashboardUsersPanelComponent } from '@app/features/organization/organization-dashboard/dashboard-users-panel/dashboard-users-panel.component';
import { UserItemComponent } from '@app/features/organization/organization-dashboard/dashboard-users-panel/user-item/user-item.component';
import { DashboardNavComponent } from '@app/features/organization/organization-dashboard/dashboard-nav/dashboard-nav.component';
import { NavItemComponent } from '@app/features/organization/organization-dashboard/dashboard-nav/nav-item/nav-item.component';
import { DashboardHeaderComponent } from '@app/features/organization/organization-dashboard/dashboard-header/dashboard-header.component';
import { DashboardActivitiesPanelComponent } from '@app/features/organization/organization-dashboard/dashboard-activities-panel/dashboard-activities-panel.component';
import { ActivityItemComponent } from '@app/features/organization/organization-dashboard/dashboard-activities-panel/activity-item/activity-item.component';
import { AddOrganizationComponent } from '@app/features/organization/add-organization/add-organization.component';
import { MyOrganizationsComponent } from '@app/features/organization/my-organizations/my-organizations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { InviteUserComponent } from '@app/features/organization/invite-user/invite-user.component';

@NgModule({
  declarations: [
    MyOrganizationsComponent,
    AddOrganizationComponent,
    OrganizationDashboardComponent,
    DashboardUsersPanelComponent,
    UserItemComponent,
    DashboardNavComponent,
    NavItemComponent,
    DashboardHeaderComponent,
    DashboardActivitiesPanelComponent,
    ActivityItemComponent,
    InviteUserComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    RouterLink,
    SharedModule,
  ],
  exports: [
    MyOrganizationsComponent,
    AddOrganizationComponent,
    OrganizationDashboardComponent,
    DashboardUsersPanelComponent,
    UserItemComponent,
    DashboardNavComponent,
    NavItemComponent,
    DashboardHeaderComponent,
    DashboardActivitiesPanelComponent,
    ActivityItemComponent,
  ],
})
export class OrganizationModule {}