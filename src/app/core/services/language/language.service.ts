import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends TranslateService {
  currentLanguage: string = <string>localStorage.getItem('currentLanguage');
  flag: { [key: string]: string } = {
    pl: 'assets/img/pl-flag.png',
    en: 'assets/img/uk-flag.png',
    cs: 'assets/img/cs-flag.png',
    da: 'assets/img/da-flag.png',
  };

  useLanguage(lang: string): void {
    this.use(lang);
    this.currentLanguage = lang;
    localStorage.setItem('currentLanguage', this.currentLanguage);
    this.setDefaultLang(this.currentLanguage);
  }

  setLocalStorage(): void {
    let browserLanguage: string = <string>this.getBrowserLang();
    let localLang: string | null = localStorage.getItem('currentLanguage');
    if (localLang === null) {
      if (this.isSupportedLanguage(browserLanguage)) {
        this.currentLanguage = <string>this.getBrowserLang();
      } else {
        this.currentLanguage = this.getDefaultLang();
      }
      localStorage.setItem('currentLanguage', this.currentLanguage);
    } else {
      this.currentLanguage = localLang;
      this.setDefaultLang(this.currentLanguage);
    }
  }

  isSupportedLanguage(_lang: string): boolean {
    return this.flag[_lang] !== null;
  }
}
