import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header-logged-in',
  templateUrl: './header-logged-in.component.html',
  styleUrls: ['./header-logged-in.component.scss'],
})
export class HeaderLoggedInComponent implements OnInit {
  profileItems?: MenuItem[];
  @Input() logout!: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
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
