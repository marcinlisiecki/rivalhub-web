import { Component } from '@angular/core';
import {UserDetailsDto} from "@interfaces/user/user-details-dto";
import {Reservation} from "@interfaces/reservation/reservation";
import {EVENTS, RESERVATIONS} from "@app/mock/stations";
import {EventDto} from "@interfaces/event/event-dto";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: UserDetailsDto = {
    id: 1,
    name: "Jakub Buszta",
    email: "buszta-jakub@wp.pl",
    profilePictureUrl: "url"
  };
  reservations: Reservation[] = RESERVATIONS;
  events: EventDto[] = EVENTS;

}
