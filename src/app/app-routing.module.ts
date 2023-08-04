import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './features/auth/register-form/register-form.component';
import { AddOrganizationComponent } from './features/organization/add-organization/add-organization.component';
import { MyOrganizationsComponent } from './features/organization/my-organizations/my-organizations.component';
import { OrganizationDashboardComponent } from './features/organization/organization-dashboard/organization-dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AddStationComponent } from './features/station/add-station/add-station.component';
import { authenticateGuard } from './core/guards/authenticate/authenticate.guard';
import { NewEventComponent } from './features/event/new-event/new-event.component';
import { InviteUserComponent } from './features/organization/invite-user/invite-user.component';
import { AddReservationComponent } from './features/reservation/add-reservation/add-reservation.component';

const routes: Routes = [
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
    path: 'organizations/:id/stations/new',
    component: AddStationComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
