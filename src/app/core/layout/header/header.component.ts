import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  profileItems: MenuItem[] | undefined;

  constructor(private authService: AuthService) {
    this.authService.isAuthObservable().subscribe((val: boolean) => {
      this.isLoggedIn = val;
    });

    this.profileItems = [
      {
        escape: false,
        label: '<span class="header-menu-item">Wyloguj się</span>',
        icon: 'pi pi-sign-out',
        command() {
          authService.logout();
        },
      },
    ];
  }
}
