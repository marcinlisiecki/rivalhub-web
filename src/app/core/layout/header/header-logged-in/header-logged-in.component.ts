import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { LanguageService } from '@app/core/services/language/language.service';
import { SidebarService } from '@app/core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-header-logged-in',
  templateUrl: './header-logged-in.component.html',
  styleUrls: ['./header-logged-in.component.scss'],
})
export class HeaderLoggedInComponent implements OnInit {
  @Input() mobileView!: boolean;

  profileItems?: MenuItem[];
  logout!: string;

  constructor(
    private authService: AuthService,
    private lang: LanguageService,
    private sidebarService: SidebarService,
  ) {}

  showSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.itemChange();
    }, 100);
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
