import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './features/auth/register-form/register-form.component';
import { AddOrganizationComponent } from './features/organization/add-organization/add-organization.component';
import { MyOrganizationsComponent } from './features/organization/my-organizations/my-organizations.component';
import {LoginComponent} from "./features/auth/login/login.component";
import {AddReservationComponent} from "./features/reservation/add-reservation/add-reservation.component";

const routes: Routes = [
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'add-organization',
    component: AddOrganizationComponent,
  },
  {
    path: 'my-organizations',
    component: MyOrganizationsComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add-reservation',
    component: AddReservationComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
