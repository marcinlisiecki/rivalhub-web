import {Component, Input} from '@angular/core';
import {Organization} from "@interfaces/organization/organization";
import {UserDetailsDto} from "@interfaces/user/user-details-dto";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // @Input({ required: true })
  user: UserDetailsDto = {
    id: 1,
    name: "Jakub Buszta",
    email: "buszta-jakub@wp.pl",
    profilePictureUrl: "assets/img/avatars/avatarplaceholder.png",
  };

  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return imageUrl;
    }

    return 'assets/img/avatars/avatarplaceholder.png';
  }

  showModal(user: UserDetailsDto) {

  }

}
