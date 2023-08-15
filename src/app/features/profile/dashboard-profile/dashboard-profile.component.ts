import { Component, Input } from '@angular/core';
import { headerCompactAnimation } from '@app/core/animations/header-animation';
import { Organization } from '@interfaces/organization/organization';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss'],
})
export class DashboardProfileComponent {
  @Input({ required: true }) user!: UserDetailsDto;
  @Input() compact: boolean = false;
  @Input() isMe!: boolean;

  checkAvatar(url: string): string {
    if (url === null) {
      return 'https://www.gravatar.com/avatar/0';
    } else {
      return url;
    }
  }
  showModal(user: UserDetailsDto) {}
}
