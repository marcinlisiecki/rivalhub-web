import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { AddOrganizationComponent } from './features/organization/add-organization/add-organization.component';
import { LayoutModule } from './core/layout/layout.module';
import { MyOrganizationsComponent } from './features/organization/my-organizations/my-organizations.component';
import { AddReservationComponent } from './features/reservation/add-reservation/add-reservation.component';
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import { CookieModule } from 'ngx-cookie';
import { AddStationComponent } from './features/station/add-station/add-station.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticateInterceptor } from './core/interceptors/authenticate/authenticate.interceptor';
import {InviteUserComponent} from "./features/organization/invite-user/invite-user.component";

@NgModule({
  declarations: [
    AppComponent,
    AddOrganizationComponent,
    MyOrganizationsComponent,
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
    SharedModule,
    AuthModule,
    CookieModule.withOptions(),
    CheckboxModule,
    FormsModule,
    CalendarModule
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
