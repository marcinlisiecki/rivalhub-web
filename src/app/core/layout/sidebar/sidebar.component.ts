import { Component, OnInit } from '@angular/core';
import {
  navBtnAnimation,
  navBtnAnimationMobile,
} from 'src/app/core/animations/sidebar-animation';
import { ViewService } from '@app/core/services/view/view.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [navBtnAnimation, navBtnAnimationMobile],
})
export class SidebarComponent implements OnInit {
  sidebarVisible: boolean = false;
  isLoggedIn: boolean = true;

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

  ngOnInit() {
    this.mobileView = this.viewService.mobileView;
    this.viewService.resizeEvent.subscribe((value: boolean) => {
      this.mobileView = value;
    });

    this.authService.isAuthObservable().subscribe((val: boolean) => {
      this.isLoggedIn = val;
    });
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
