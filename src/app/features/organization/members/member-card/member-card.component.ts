import {Component, Input, OnInit} from '@angular/core';
import {UserDetailsDto} from "@interfaces/user/user-details-dto";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() user!: UserDetailsDto

  constructor() {}

  ngOnInit() {
    console.log(this.user.name)
    console.log(this.user.email)
  }
  getImagePath(imageUrl: string | null): string {
    if (imageUrl !== null) {
      return imageUrl;
    }

    return 'assets/img/avatars/avatarplaceholder.png';
  }
}
