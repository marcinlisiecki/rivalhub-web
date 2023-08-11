import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-header-logged-in',
  templateUrl: './header-logged-in.component.html',
  styleUrls: ['./header-logged-in.component.scss'],
})
export class HeaderLoggedInComponent implements OnInit {
  profileItems?: MenuItem[];
  constructor(
    private authService: AuthService,
    private lang: LanguageService,
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
