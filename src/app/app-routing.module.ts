import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './features/auth/register-form/register-form.component';
import { AddOrganizationComponent } from './features/organization/add-organization/add-organization.component';
import {LoginComponent} from "./features/auth/login/login.component";
import { AddStationComponent} from "./features/station/add-station/add-station.component";

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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'organizations/:id/add-station',
    component: AddStationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
