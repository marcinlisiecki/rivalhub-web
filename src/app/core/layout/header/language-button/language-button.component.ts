import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {LanguageService} from "@app/core/services/language/language.service";

@Component({
  selector: 'app-lang-btn',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss']
})
export class LanguageButtonComponent implements OnInit {
  flagItems?: MenuItem[];
  currentLanguage: string = '';
  pathOfFlag: string = '';
  flag: { [key: string]: string } = {
    pl: 'assets/img/pl-flag.png',
    en: 'assets/img/uk-flag.png',
  };


  constructor(
    private lang: LanguageService,
    ) {}
  ngOnInit() {
    this.lang.setLocalStorage()
    this.pathOfFlag = this.flag[this.lang.currentLanguage];
    this.flagItems = [
      {
        label: `<img src="${this.flag['pl']}" alt="pl" width="24" height="15"/>`,
        escape: false,
        command: () => {
          this.lang.useLanguage('pl');
          this.pathOfFlag = this.flag['pl'];
          },
      },
      {
        label: `<img src="${this.flag['en']}" alt="en" width="24" height="15"/>`,
        escape: false,
        command: () => {
          this.lang.useLanguage('en');
          this.pathOfFlag = this.flag['en'];
          },
      },
    ];
  }

}
