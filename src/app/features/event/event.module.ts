import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEventComponent } from './new-event/new-event.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [NewEventComponent],
  imports: [CommonModule, CardModule],
})
export class EventModule {}
