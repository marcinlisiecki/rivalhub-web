import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ActivateAccountComponent],
  imports: [
    CommonModule,
    MessageModule,
    MessagesModule,
    SharedModule,
    TranslateModule,
    SharedModule,
  ],
})
export class UserModule {}
