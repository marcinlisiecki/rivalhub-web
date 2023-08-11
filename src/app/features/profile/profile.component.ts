import { Component, OnInit } from '@angular/core';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import { EVENTS, RESERVATIONS } from '@app/mock/stations';
import { EventDto } from '@interfaces/event/event-dto';
import { UserService } from '@app/core/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: UserDetailsDto;
  reservations: Reservation[] = RESERVATIONS;
  events: EventDto[] = EVENTS;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];

    this.userService.getUser(userId).subscribe((user) => {
      console.log(user);
      this.user.name = user.name;
      this.user.email = user.email;
      this.user.profilePictureUrl = this.checkAvatar(user.profilePictureUrl);
    });
  }

  private checkAvatar(url: string): string {
    if (url === null) {
      return 'https://www.gravatar.com/avatar/0';
    } else {
      return url;
    }
  }
}
