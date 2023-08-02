import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TranslateService, MessageService],
})
export class HeaderComponent {
  pathOfFlag: string = 'assets/img/pl-flag.png';
  isLoggedIn: boolean = true;
  items: MenuItem[] | undefined;
  currentLanguage: string = '';
  flag = {
    pl: 'assets/img/pl-flag.png',
    en: 'assets/img/uk-flag.png',
  };
  constructor(private translate: TranslateService) {
    if (localStorage.getItem('currentLanguage') === null) {
      this.currentLanguage = <string>translate.getBrowserLang();
      localStorage.setItem('currentLanguage', this.currentLanguage);
    } else {
      this.currentLanguage = <string>localStorage.getItem('currentLanguage');
    }
    this.translate.use(<string>this.currentLanguage);
    this.items = [
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
  }

  useLanguage(lang: string) {
    // @ts-ignore
    this.pathOfFlag = this.flag[lang];
    this.translate.use(lang);
    this.currentLanguage = lang;
    localStorage.setItem('currentLanguage', this.currentLanguage);
  }
}
