import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { AddOrganizationComponent } from './features/organization/add-organization/add-organization.component';
import { LayoutModule } from './core/layout/layout.module';

@NgModule({
  declarations: [AppComponent, AddOrganizationComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, AuthModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
