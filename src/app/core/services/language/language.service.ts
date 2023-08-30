import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

enum Flag {
  pl = 'assets/img/pl-flag.png',
  en = 'assets/img/uk-flag.png',
  cs = 'assets/img/cs-flag.png',
  da = 'assets/img/da-flag.png',
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends TranslateService {
  currentLanguage: WritableSignal<string> = signal(
    <string>localStorage.getItem('currentLanguage'),
  );
  flag = Flag;

  useLanguage(lang: string): void {
    this.use(lang);
    this.currentLanguage.set(lang);
    localStorage.setItem('currentLanguage', this.currentLanguage());
    this.setDefaultLang(this.currentLanguage());
  }

  setLocalStorage(): void {
    let browserLanguage: string = <string>this.getBrowserLang();
    let localLang: string | null = localStorage.getItem('currentLanguage');
    if (localLang === null) {
      if (this.isSupportedLanguage(browserLanguage)) {
        this.currentLanguage.set(<string>this.getBrowserLang());
      } else {
        this.currentLanguage.set(this.getDefaultLang());
      }
      localStorage.setItem('currentLanguage', this.currentLanguage());
    } else {
      this.currentLanguage.set(localLang);
      this.setDefaultLang(this.currentLanguage());
    }
  }

  isSupportedLanguage(_lang: string): boolean {
    return _lang in this.flag;
  }

  getCurrentLanguage(): WritableSignal<string> {
    return this.currentLanguage;
  }
}
