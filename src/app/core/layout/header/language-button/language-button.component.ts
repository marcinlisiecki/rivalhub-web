import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-lang-btn',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss'],
})
export class LanguageButtonComponent implements OnInit {
  flagItems: MenuItem[] = [];
  currentLanguage: string = '';
  pathOfFlag: string = '';
  private flag!: { [key: string]: string };

  constructor(private lang: LanguageService) {}

  ngOnInit(): void {
    this.flag = this.lang.flag;
    this.pathOfFlag = this.flag[this.lang.currentLanguage()];

    for (let flagKey in this.lang.flag) {
      let option = {
        label: `<img src="${this.flag[flagKey]}" alt=${flagKey} width="24" height="15"/>`,
          escape: false,
        command: () => {
        this.lang.useLanguage(flagKey);
        this.pathOfFlag = this.flag[flagKey];
      },
      }
      this.flagItems.push(option);
    }
  }
}
