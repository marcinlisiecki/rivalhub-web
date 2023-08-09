import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '@app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ViewService } from '@app/core/services/view/view.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = true;
  logout!: string;
  flagItems?: MenuItem[];
  currentLanguage: string = '';
  pathOfFlag: string = '';
  flag: { [key: string]: string } = {
    pl: 'assets/img/pl-flag.png',
    en: 'assets/img/uk-flag.png',
  };
  mobileView!: boolean;
  authSubscription?: Subscription;
  mobileViewSubscription?: Subscription;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private viewService: ViewService,
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService
      .isAuthObservable()
      .subscribe((val: boolean) => {
        this.isLoggedIn = val;
      });
    this.mobileView = this.viewService.mobileView;
    this.mobileViewSubscription = this.viewService.resizeSubject.subscribe(
      (value: boolean) => {
        this.mobileView = value;
      },
    );

    this.profileLogoutLangSetter(this.currentLanguage);
    this.setDefaultLanguage();

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
    this.authSubscription?.unsubscribe();
    this.mobileViewSubscription?.unsubscribe();
  }

  setDefaultLanguage(): void {
    if (localStorage.getItem('currentLanguage') === null) {
      this.currentLanguage = <string>this.translate.getBrowserLang();
      this.pathOfFlag = this.flag[this.currentLanguage];
      localStorage.setItem('currentLanguage', this.currentLanguage);
    } else {
      this.currentLanguage = <string>localStorage.getItem('currentLanguage');
    }
  }
  useLanguage(lang: string) {
    this.pathOfFlag = this.flag[lang];
    this.translate.use(lang);
    this.currentLanguage = lang;
    localStorage.setItem('currentLanguage', this.currentLanguage);
    this.profileLogoutLangSetter(this.currentLanguage);
  }

  profileLogoutLangSetter(lang: string) {
    if (lang === 'pl') {
      this.logout = 'Wyloguj się';
    } else {
      this.logout = 'Logout';
    }
  }
}
