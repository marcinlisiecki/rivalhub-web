import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import { EVENTS, RESERVATIONS } from '@app/mock/stations';
import { EventDto } from '@interfaces/event/event-dto';
import { UsersService } from '@app/core/services/users/users.service';
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
  sticky: boolean = false;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];

    this.usersService.getMe().subscribe((user: UserDetailsDto) => {
      console.log(user);
      this.user = user;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const dashboardElement = this.el.nativeElement.querySelector(
      '.dashboard-container-header',
    );
    //check if dashboardelement exists
    if (!dashboardElement) return;
    const dashboardRect = dashboardElement.getBoundingClientRect();

    const dashboardTop = dashboardRect.top + 60;

    console.log('TOP:', dashboardTop);
    console.log('Scroll', window.scrollY);
    if (window.scrollY >= dashboardTop && !this.sticky) {
      this.sticky = true;
    } else if (window.scrollY < dashboardTop && this.sticky) {
      this.sticky = false;
    }
  }

  private checkAvatar(url: string): string {
    if (url === null) {
      return 'https://www.gravatar.com/avatar/0';
    } else {
      return url;
    }
  }
}
