import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { AddOrganizationComponent } from './features/organization/add-organization/add-organization.component';
import { LayoutModule } from './core/layout/layout.module';
import { AddStationComponent } from './features/station/add-station/add-station.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MyOrganizationsComponent} from "./features/organization/my-organizations/my-organizations.component";
import { InviteUserComponent } from './features/organization/invite-user/invite-user.component';

@NgModule({
  declarations: [AppComponent, AddOrganizationComponent, AddStationComponent, MyOrganizationsComponent, InviteUserComponent],
    imports: [BrowserModule, AppRoutingModule, SharedModule, AuthModule, LayoutModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
