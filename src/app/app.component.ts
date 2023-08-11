import {Component, OnInit} from '@angular/core';
import {LanguageService} from "@app/core/services/language/language.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private lang: LanguageService) {
  }
  ngOnInit(): void {
    this.lang.setLocalStorage();

  }

}
