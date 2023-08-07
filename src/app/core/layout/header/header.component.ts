import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService, MenuItemCommandEvent } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TranslateService, MessageService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = true;
  flagItems: MenuItem[] | undefined;
  profileItems: MenuItem[] | undefined;
  currentLanguage: string = '';
  pathOfFlag: string = '';
  authServiceSub?: Subscription;
  flag: { [key: string]: string } = {
    pl: 'assets/img/pl-flag.png',
    en: 'assets/img/uk-flag.png',
  };

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
  ) {
    this.profileLogoutLangSetter(this.currentLanguage);

    //ustawianie localstorage i jezyka domyslnego
    if (localStorage.getItem('currentLanguage') === null) {
      this.currentLanguage = <string>translate.getBrowserLang();
      this.pathOfFlag = this.flag[this.currentLanguage];
      localStorage.setItem('currentLanguage', this.currentLanguage);
    } else {
      this.currentLanguage = <string>localStorage.getItem('currentLanguage');
    }
    // items dla menu
    this.flagItems = [
      {
        label: `<img src="${this.flag['pl']}" alt="pl" width="24" height="15"/>`,
        escape: false,
        command: () => this.useLanguage('pl'),
      },
      {
        label: `<img src="${this.flag['en']}" alt="en" width="24" height="15"/>`,
        escape: false,
        command: () => this.useLanguage('en'),
      },
    ];
    this.useLanguage(<string>this.currentLanguage);
  }

  ngOnDestroy(): void {
    this.authServiceSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.authServiceSub = this.authService
      .isAuthObservable()
      .subscribe((val: boolean) => {
        this.isLoggedIn = val;
      });
  }

  useLanguage(lang: string) {
    //ustawienie wybranego jezyka
    this.pathOfFlag = this.flag[lang];
    this.translate.use(lang);
    this.currentLanguage = lang;
    localStorage.setItem('currentLanguage', this.currentLanguage);
    this.profileLogoutLangSetter(this.currentLanguage);
  }

  profileLogoutLangSetter(lang: string) {
    let logout: string;
    if (lang === 'pl') {
      logout = 'Wyloguj się';
    } else {
      logout = 'Logout';
    }

    this.profileItems = [
      {
        escape: false,
        label: `<span class="header-menu-item">${logout}</span>`,
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
        },
      },
    ];
  }
}
