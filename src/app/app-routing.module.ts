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
import { JoinOrganizationComponent } from '@app/features/organization/join-organization/join-organization.component';
import { joinGuard } from '@app/core/guards/join-organization/join.guard';
import { ProfileComponent } from '@app/features/profile/profile.component';
import { ActivateAccountComponent } from '@app/features/user/activate-account/activate-account.component';

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
    path: 'organizations/:id/reservations/new',
    component: AddReservationComponent,
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
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'users/confirm/:hash',
    component: ActivateAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
