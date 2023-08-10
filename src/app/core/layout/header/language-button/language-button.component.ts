import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-lang-btn',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss'],
})
export class LanguageButtonComponent implements OnInit {
  flagItems?: MenuItem[];
  currentLanguage: string = '';
  pathOfFlag: string = '';
  private flag!: { [key: string]: string };

  constructor(private lang: LanguageService) {}
  ngOnInit(): void {
    this.flag = this.lang.flag;
    this.pathOfFlag = this.flag[this.lang.currentLanguage];
    /**
     * TODO: generowanie tablicy flagItems dynamicznie
     * */
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
      {
        label: `<img src="${this.flag['cs']}" alt="cz" width="24" height="15"/>`,
        escape: false,
        command: () => {
          this.lang.useLanguage('cs');
          this.pathOfFlag = this.flag['cs'];
        },
      },
      {
        label: `<img src="${this.flag['da']}" alt="dk" width="24" height="15"/>`,
        escape: false,
        command: () => {
          this.lang.useLanguage('da');
          this.pathOfFlag = this.flag['da'];
        },
      },
    ];
  }
}
