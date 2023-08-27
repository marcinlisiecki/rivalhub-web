import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PasswordModule } from 'primeng/password';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MessageModule } from 'primeng/message';
import { LayoutModule } from '@app/core/layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [RegisterFormComponent, LoginComponent],
  imports: [
    CommonModule,
    PasswordModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MessageModule,
    LayoutModule,
    TranslateModule,
    RouterLink,
  ],
  exports: [RegisterFormComponent, LoginComponent],
})
export class AuthModule {}
