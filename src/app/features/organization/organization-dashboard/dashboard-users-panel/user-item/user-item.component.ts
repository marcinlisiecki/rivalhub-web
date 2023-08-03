import { Component, Input } from '@angular/core';
import { UserDto } from '@app/core/interfaces/UserDto';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {
  @Input({ required: true }) user!: UserDto;
}
