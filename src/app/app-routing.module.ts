import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './features/auth/register-form/register-form.component';
import { AddOrganizationComponent } from './features/organization/add-organization/add-organization.component';
import { MyOrganizationsComponent } from './features/organization/my-organizations/my-organizations.component';
import { OrganizationDashboardComponent } from './features/organization/organization-dashboard/organization-dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authenticateGuard } from './core/guards/authenticate/authenticate.guard';
import { NewEventComponent } from './features/event/new-event/new-event.component';
import { InviteUserComponent } from './features/organization/invite-user/invite-user.component';
import { AddReservationComponent } from './features/reservation/add-reservation/add-reservation.component';
import { HeroComponent } from '@app/features/landing/hero/hero.component';
import { ViewStationsComponent } from '@app/features/station/view-stations/view-stations.component';
import { CalendarComponent } from '@app/features/calendar/calendar.component';
import { ActivateAccountComponent } from '@app/features/user/activate-account/activate-account.component';
import { ConfiguratorComponent } from '@app/features/organization/configurator/configurator.component';
import { AddPingPongResultsComponent } from '@app/features/event/ping-pong/add-ping-pong-results/add-ping-pong-results.component';
import { JoinOrganizationComponent } from '@app/features/organization/join-organization/join-organization.component';
import { joinGuard } from '@app/core/guards/join-organization/join.guard';
import { ProfileComponent } from '@app/features/profile/profile.component';
import { MembersComponent } from '@app/features/organization/members/members.component';
import { OrganizationSettingsComponent } from '@app/features/organization/organization-settings/organization-settings.component';
import { ViewEventComponent } from '@app/features/event/view-event/view-event.component';
import { AddResultsComponent } from '@app/features/event/add-results/add-results.component';
import { EditProfileComponent } from './features/profile/edit-profile/edit-profile.component';
import { ViewOrganizationEventsComponent } from '@app/features/organization/view-organization-events/view-organization-events.component';
import { ViewReservationComponent } from '@app/features/reservation/view-reservation/view-reservation.component';
import { RankingComponent } from '@app/features/ranking/ranking.component';
import { PageNotFoundComponent } from '@app/shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HeroComponent,
  },

  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'organizations/new',
    component: AddOrganizationComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations',
    component: MyOrganizationsComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:id',
    component: OrganizationDashboardComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'organizations/:id/settings',
    component: OrganizationSettingsComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:id/reservations/new',
    component: AddReservationComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:organizationId/reservations/:reservationId',
    component: ViewReservationComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:id/stations',
    component: ViewStationsComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:id/invite',
    component: InviteUserComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:id/events',
    component: ViewOrganizationEventsComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:id/events/new',
    component: NewEventComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:id/invitation/:hash',
    component: JoinOrganizationComponent,
    canActivate: [joinGuard],
  },
  {
    path: 'profiles/:id',
    component: ProfileComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'profiles/:id/edit',
    component: EditProfileComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:id/members',
    component: MembersComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'users/confirm/:hash',
    component: ActivateAccountComponent,
  },
  {
    path: 'organizations/:id/configurator',
    component: ConfiguratorComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:organizationId/events/:eventId/results',
    component: AddResultsComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:organizationId/ranking',
    component: RankingComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'organizations/:organizationId/events/:eventId',
    component: ViewEventComponent,
    canActivate: [authenticateGuard],
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
