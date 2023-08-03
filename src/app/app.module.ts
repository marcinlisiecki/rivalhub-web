import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { AddOrganizationComponent } from './features/organization/add-organization/add-organization.component';
import { LayoutModule } from './core/layout/layout.module';
import { MyOrganizationsComponent } from './features/organization/my-organizations/my-organizations.component';
import { CookieModule } from 'ngx-cookie';
import { AddStationComponent } from './features/station/add-station/add-station.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddOrganizationComponent,
    AddStationComponent,
    MyOrganizationsComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
