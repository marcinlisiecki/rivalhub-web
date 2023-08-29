import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { LanguageService } from '@app/core/services/language/language.service';
import { SidebarService } from '@app/core/services/sidebar/sidebar.service';
import { UsersService } from '@app/core/services/users/users.service';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';

@Component({
  selector: 'app-header-logged-in',
  templateUrl: './header-logged-in.component.html',
  styleUrls: ['./header-logged-in.component.scss'],
})
export class HeaderLoggedInComponent implements OnInit {
  @Input() mobileView!: boolean;

  profileItems?: MenuItem[];
  logout!: string;
  isAccountActivated: boolean = false;
  user!: UserDetailsDto;

  constructor(
    private authService: AuthService,
    private lang: LanguageService,
    private sidebarService: SidebarService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.itemChange();
    }, 100);

    if (this.authService.isAuth()) {
      this.usersService.getMe().subscribe((user: UserDetailsDto) => {
        this.user = user;
        this.isAccountActivated = user.activationTime !== null;
      });
    }
  }

  showSidebar() {
    this.sidebarService.toggleSidebar();
  }

  itemChange() {
    this.logout = this.lang.instant('header.logout');
    this.profileItems = [
      {
        escape: false,
        label: `<span class="header-menu-item">${this.logout}</span>`,
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
        },
      },
    ];
  }
}
