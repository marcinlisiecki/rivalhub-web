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
import { AddReservationComponent } from './features/reservation/add-reservation/add-reservation.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CookieModule } from 'ngx-cookie';
import { AddStationComponent } from './features/station/add-station/add-station.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticateInterceptor } from './core/interceptors/authenticate/authenticate.interceptor';
import {InviteUserComponent} from "./features/organization/invite-user/invite-user.component";
import { EventModule } from './features/event/event.module';

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
    AddStationComponent,
    InviteUserComponent,
    AddReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    LayoutModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
    CookieModule.withOptions(),
    CheckboxModule,
    FormsModule,
    CalendarModule,
    EventModule,
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticateInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
