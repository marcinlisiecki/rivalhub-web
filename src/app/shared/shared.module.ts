import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ValidationErrorComponent],
  exports: [
    ValidationErrorComponent,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
  imports: [CommonModule, CardModule, InputTextModule, ButtonModule],
})
export class SharedModule {}
