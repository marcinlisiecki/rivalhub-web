import {Injectable, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends TranslateService{
  currentLanguage: string = <string>this.getBrowserLang();
  setLocalStorage(lang:string = this.currentLanguage):void{
    if (localStorage.getItem('currentLanguage') === null) {
     this.currentLanguage = <string>this.getBrowserLang();
      localStorage.setItem('currentLanguage', this.currentLanguage);
   } else {
      this.currentLanguage = <string>localStorage.getItem('currentLanguage');
   }
  }

  useLanguage(lang: string):  void {
    this.use(lang);
    this.currentLanguage = lang;
    localStorage.setItem('currentLanguage', this.currentLanguage);
  }

}
