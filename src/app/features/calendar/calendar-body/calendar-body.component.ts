import {ChangeDetectionStrategy, Inject,Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, CalendarView} from "angular-calendar";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalendarBodyComponent implements OnInit, OnDestroy{
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      title: 'LOL',
      start: new Date(),
    },
  ];

  lol(){
    alert("lol");
  }

  private readonly darkThemeClass = 'dark-theme';


  constructor(@Inject(DOCUMENT) private document:any) {}

  ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
  }

}
