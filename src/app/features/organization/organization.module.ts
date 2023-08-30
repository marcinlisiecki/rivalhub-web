import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { OrganizationDashboardComponent } from '@app/features/organization/organization-dashboard/organization-dashboard.component';
import { DashboardUsersPanelComponent } from '@app/features/organization/organization-dashboard/dashboard-users-panel/dashboard-users-panel.component';
import { UserItemComponent } from '@app/features/organization/organization-dashboard/dashboard-users-panel/user-item/user-item.component';
import { DashboardHeaderComponent } from '@app/features/organization/organization-dashboard/dashboard-header/dashboard-header.component';
import { DashboardActivitiesPanelComponent } from '@app/features/organization/organization-dashboard/dashboard-activities-panel/dashboard-activities-panel.component';
import { AddOrganizationComponent } from '@app/features/organization/add-organization/add-organization.component';
import { MyOrganizationsComponent } from '@app/features/organization/my-organizations/my-organizations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { InviteUserComponent } from '@app/features/organization/invite-user/invite-user.component';
import { JoinOrganizationComponent } from './join-organization/join-organization.component';
import { MembersComponent } from './members/members.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { MessageModule } from 'primeng/message';
import { SpinnerModule } from 'primeng/spinner';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { StationModule } from '@app/features/station/station.module';
import { AvailableEventsConfiguratorComponent } from './configurator/available-events-configurator/available-events-configurator.component';
import { StationsConfiguratorComponent } from './configurator/stations-configurator/stations-configurator.component';
import { SettingsConfiguratorComponent } from './configurator/settings-configurator/settings-configurator.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AdminCardComponent } from './members/admin-card/admin-card.component';
import { OrganizationSettingsComponent } from '@app/features/organization/organization-settings/organization-settings.component';
import { Tag, TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ViewOrganizationEventsComponent } from './view-organization-events/view-organization-events.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import {AccordionModule} from "primeng/accordion";
import {AngularSvgIconModule} from "angular-svg-icon";
import {MenuModule} from "primeng/menu";

@NgModule({
  declarations: [
    MyOrganizationsComponent,
    AddOrganizationComponent,
    OrganizationDashboardComponent,
    DashboardUsersPanelComponent,
    UserItemComponent,
    DashboardHeaderComponent,
    DashboardActivitiesPanelComponent,
    InviteUserComponent,
    JoinOrganizationComponent,
    ConfiguratorComponent,
    AvailableEventsConfiguratorComponent,
    StationsConfiguratorComponent,
    SettingsConfiguratorComponent,
    MembersComponent,
    MemberCardComponent,
    AdminCardComponent,
    OrganizationSettingsComponent,
    ViewOrganizationEventsComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    RouterLink,
    SharedModule,
    InfiniteScrollModule,
    NgOptimizedImage,
    FormsModule,
    TranslateModule,
    MessageModule,
    SpinnerModule,
    NgOptimizedImage,
    ContextMenuModule,
    StationModule,
    CheckboxModule,
    FormsModule,
    ConfirmPopupModule,
    ColorPickerModule,
    TagModule,
    DropdownModule,
    PaginatorModule,
    InputSwitchModule,
    AccordionModule,
    AngularSvgIconModule,
    MenuModule,
  ],
  exports: [
    MyOrganizationsComponent,
    AddOrganizationComponent,
    OrganizationDashboardComponent,
    DashboardUsersPanelComponent,
    UserItemComponent,
    DashboardHeaderComponent,
    DashboardActivitiesPanelComponent,
    ColorPickerModule,
    TagModule,
  ],
})
export class OrganizationModule {}
