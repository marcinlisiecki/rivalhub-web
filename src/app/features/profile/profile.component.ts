import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  OnDestroy,
} from '@angular/core';

import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import { EVENTS, RESERVATIONS } from '@app/mock/stations';
import { EventDto } from '@interfaces/event/event-dto';
import { UsersService } from '@app/core/services/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, debounceTime, fromEvent } from 'rxjs';
import { headerCompactAnimation } from '@app/core/animations/header-animation';
import { AuthService } from '@app/core/services/auth/auth.service';
import { PingPongResult } from '@app/core/interfaces/event/games/ping-pong/ping-pong-result';
import { BilliardsResult } from '@app/core/interfaces/event/games/billiards/billiards';
import { GAMES } from '@app/mock/results';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [headerCompactAnimation],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user!: UserDetailsDto;
  reservations!: Reservation[];
  games: PingPongResult[] = GAMES;
  compact: boolean = false;
  private scrollSubject = new Subject<Event>();
  isMe!: boolean;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];

    this.usersService.getUser(userId).subscribe((user: UserDetailsDto) => {
      this.user = user;
      this.isMe = this.user.email === this.authService.getUserEmail();
    });

    // this.usersService
    //   .getCommonEvents(userId)
    //   .subscribe((events: EventDto[]) => {
    //     this.events = events;
    //   });

    this.usersService
      .getCommonReservations(userId)
      .subscribe((reservations: Reservation[]) => {
        this.reservations = reservations;
      });

    this.scrollSubject.pipe(debounceTime(10)).subscribe((event: Event) => {
      this.handleScroll(event);
    });
  }

  ngOnDestroy(): void {
    this.scrollSubject.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.scrollSubject.next(event);
  }

  handleScroll(event: Event) {
    const dashboardElement = this.el.nativeElement.querySelector(
      '.dashboard-container-header',
    );
    if (!dashboardElement) return;
    const dashboardRect = dashboardElement.getBoundingClientRect();
    const dashboardTop = dashboardRect.top + 140;

    // console.log('TOP:', dashboardTop);
    // console.log('Scroll', window.scrollY);
    if (window.scrollY >= dashboardTop && !this.compact) {
      this.compact = true;
    } else if (window.scrollY < dashboardTop && this.compact) {
      this.compact = false;
    }
  }
}
