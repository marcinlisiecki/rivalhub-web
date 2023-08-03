import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './features/auth/register-form/register-form.component';
import { AddOrganizationComponent } from './features/organization/add-organization/add-organization.component';
import { MyOrganizationsComponent } from './features/organization/my-organizations/my-organizations.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AddStationComponent } from './features/station/add-station/add-station.component';
import { authenticateGuard } from './core/guards/authenticate/authenticate.guard';

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
    path: 'my-organizations',
    component: MyOrganizationsComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'organizations/:id/add-station',
    component: AddStationComponent,
    canActivate: [authenticateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
