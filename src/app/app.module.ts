import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { LayoutModule } from './core/layout/layout.module';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthenticateInterceptor } from './core/interceptors/authenticate/authenticate.interceptor';
import { EventModule } from './features/event/event.module';
import { LandingModule } from './features/landing/landing.module';
import { OrganizationModule } from './features/organization/organization.module';
import { ReservationModule } from './features/reservation/reservation.module';
import { StationModule } from './features/station/station.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { ProfileComponent } from './features/profile/profile.component';
import { DashboardComponent } from './features/profile/dashboard/dashboard.component';
import {
    DashboardActivitiesComponent
} from "@app/features/profile/dashboard-activities-panel/dashboard-activities.component";
import {ActivityComponent} from "@app/features/profile/dashboard-activities-panel/activity-item/activity.component";
import {DashboardHistoryComponent} from "@app/features/profile/dashboard-history-panel/dashboard-history.component";
import {History} from "@app/features/profile/dashboard-history-panel/activity-item/history.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DashboardComponent,
    DashboardActivitiesComponent,
    ActivityComponent,
    DashboardHistoryComponent,
    History,
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
    EventModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    LandingModule,
    OrganizationModule,
    ReservationModule,
    StationModule,
    InfiniteScrollModule,
  ],

  providers: [
    TranslateService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticateInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
