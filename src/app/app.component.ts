import { Component, OnInit } from '@angular/core';
import { LanguageService } from '@app/core/services/language/language.service';
import { CalendarService } from '@app/core/services/calendar/calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private lang: LanguageService,
    private cal: CalendarService,
  ) {}
  ngOnInit(): void {
    this.cal.setLocalStorage();
  }
}
