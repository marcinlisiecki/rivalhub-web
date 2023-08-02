import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService,  MenuItemCommandEvent} from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TranslateService, MessageService],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  flagItems: MenuItem[] | undefined;
  profileItems: MenuItem[] | undefined;
  currentLanguage: string = '';
  pathOfFlag: string = '';
  flag: { [key: string]: string } = {
    pl: 'assets/img/pl-flag.png',
    en: 'assets/img/uk-flag.png',
  };

  constructor(private translate: TranslateService,private authService: AuthService) {

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
  }
}
