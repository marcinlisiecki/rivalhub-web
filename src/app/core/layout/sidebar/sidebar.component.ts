import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  navBtnAnimation,
  navBtnAnimationMobile,
} from 'src/app/core/animations/sidebar-animation';
import { ViewService } from '@app/core/services/view/view.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [navBtnAnimation, navBtnAnimationMobile],
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean = false;
  isLoggedIn: boolean = true;
  mobileViewSubscription?: Subscription;
  mobileView!: boolean;

  selectedOrganization: string = 'NCDC';
  user: UserDetailsDto = {
    id: 0,
    name: 'Dominik Matuszewski',
    email: 'zippek@edu.pl',
    profilePictureUrl: 'https://i.imgur.com/1qB7B9F.png',
  };

  constructor(
    private viewService: ViewService,
    private authService: AuthService,
  ) {}
  ngOnDestroy(): void {
    this.mobileViewSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.authService.isAuthObservable().subscribe((val: boolean) => {
      this.isLoggedIn = val;
    });

    this.mobileView = this.viewService.mobileView;
    this.mobileViewSubscription = this.viewService.resizeSubject.subscribe(
      (value: boolean) => {
        console.log(value);
        this.mobileView = value;
      },
    );
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
