import { Component, Input } from '@angular/core';

import { UserDetailsDto } from '@interfaces/user/user-details-dto';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {
  @Input({ required: true }) user!: UserDetailsDto;

  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return imageUrl;
    }

    return '/assets/img/avatars/user.png';
  }
}
