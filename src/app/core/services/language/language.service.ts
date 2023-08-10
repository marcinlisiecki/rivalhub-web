import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends TranslateService {
  currentLanguage: string = <string>localStorage.getItem('currentLanguage');

  useLanguage(lang: string): void {
    this.use(lang);
    this.currentLanguage = lang;
    localStorage.setItem('currentLanguage', this.currentLanguage);
    this.setDefaultLang(this.currentLanguage);
  }

  setLocalStorage(): void {
    let localLang: string | null = localStorage.getItem('currentLanguage');
    if (localLang === null) {
      this.currentLanguage = <string>this.getBrowserLang();
      localStorage.setItem('currentLanguage', this.currentLanguage);
    } else {
      this.currentLanguage = localLang;
    }
    this.setDefaultLang(this.currentLanguage);
  }
}
