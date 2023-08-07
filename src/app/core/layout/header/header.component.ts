import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService, MenuItemCommandEvent } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';
import { ViewService } from '@app/core/services/view/view.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TranslateService, MessageService],
})
export class HeaderComponent {
  isLoggedIn: boolean = true;
  flagItems: MenuItem[] | undefined;
  profileItems: MenuItem[] | undefined;
  currentLanguage: string = '';
  pathOfFlag: string = '';
  flag: { [key: string]: string } = {
    pl: 'assets/img/pl-flag.png',
    en: 'assets/img/uk-flag.png',
  };
  mobileView!: boolean;
  ngOnInit() {
    this.mobileView = this.viewService.mobileView;
    this.viewService.resizeEvent.subscribe((value: boolean) => {
      this.mobileView = value;
    });
  }

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private viewService: ViewService,
  ) {
    this.authService.isAuthObservable().subscribe((val: boolean) => {
      this.isLoggedIn = val;
    });

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
