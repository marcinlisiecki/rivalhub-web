import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  OnDestroy,
} from '@angular/core';

import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import { UsersService } from '@app/core/services/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, debounceTime, fromEvent } from 'rxjs';
import { headerCompactAnimation } from '@app/core/animations/header-animation';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [headerCompactAnimation],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user!: UserDetailsDto;
  reservations: Reservation[] = [];
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
      this.fetchReservations(Number(userId));
    });

    this.scrollSubject.pipe(debounceTime(10)).subscribe((event: Event) => {
      this.handleScroll(event);
    });
  }
  fetchReservations(userId: number) {
    this.usersService.getCommonReservations(userId).subscribe({
      next: (reservations: Reservation[]) => {
        this.reservations = reservations;
      },
    });
  }

  ngOnDestroy(): void {
    this.scrollSubject.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.scrollSubject.next(event);
  }

  private handleScroll(event: Event) {
    const dashboardElement = this.el.nativeElement.querySelector(
      '.dashboard-container-header',
    );
    if (!dashboardElement) return;
    const dashboardRect = dashboardElement.getBoundingClientRect();
    const dashboardTop = dashboardRect.top + 140;

    if (window.scrollY >= dashboardTop && !this.compact) {
      this.compact = true;
    } else if (window.scrollY < dashboardTop && this.compact) {
      this.compact = false;
    }
  }
}
