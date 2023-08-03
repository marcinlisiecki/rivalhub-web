import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { AddOrganizationComponent } from './features/organization/add-organization/add-organization.component';
import { LayoutModule } from './core/layout/layout.module';
import { MyOrganizationsComponent } from './features/organization/my-organizations/my-organizations.component';
import { OrganizationDashboardComponent } from './features/organization/organization-dashboard/organization-dashboard.component';
import { DashboardHeaderComponent } from './features/organization/organization-dashboard/dashboard-header/dashboard-header.component';
import { DashboardNavComponent } from './features/organization/organization-dashboard/dashboard-nav/dashboard-nav.component';
import { DashboardUsersPanelComponent } from './features/organization/organization-dashboard/dashboard-users-panel/dashboard-users-panel.component';
import { UserItemComponent } from './features/organization/organization-dashboard/dashboard-users-panel/user-item/user-item.component';
import { DashboardActivitiesPanelComponent } from './features/organization/organization-dashboard/dashboard-activities-panel/dashboard-activities-panel.component';
import { ActivityItemComponent } from './features/organization/organization-dashboard/dashboard-activities-panel/activity-item/activity-item.component';
import { NavItemComponent } from './features/organization/organization-dashboard/dashboard-nav/nav-item/nav-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AddOrganizationComponent,
    MyOrganizationsComponent,
    OrganizationDashboardComponent,
    DashboardHeaderComponent,
    DashboardNavComponent,
    DashboardUsersPanelComponent,
    UserItemComponent,
    DashboardActivitiesPanelComponent,
    ActivityItemComponent,
    NavItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
