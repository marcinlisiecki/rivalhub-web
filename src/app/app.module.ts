import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProfileModule } from './features/profile/profile.module';
import { CalendarModule } from '@app/features/calendar/calendar.module';
import { UserModule } from './features/user/user.module';
import { DatePipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { LanguageService } from '@app/core/services/language/language.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RankingComponent } from './features/ranking/ranking.component';
import { RankingUsersComponent } from './features/ranking/ranking-users/ranking-users.component';
import { RankingCategoriesComponent } from './features/ranking/ranking-categories/ranking-categories.component';
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    RankingUsersComponent,
    RankingCategoriesComponent,
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
    AngularSvgIconModule.forRoot(),
    CookieModule.withOptions(),
    EventModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pl',
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
    ProfileModule,
    CalendarModule,
    UserModule,
    InfiniteScrollModule,
    DropdownModule,
    TableModule,
  ],

  providers: [
    TranslateService,
    MessageService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticateInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [LanguageService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function appInitializerFactory(translate: LanguageService) {
  return () => {
    translate.setLocalStorage();
    return lastValueFrom(translate.use(translate.currentLanguage()));
  };
}
