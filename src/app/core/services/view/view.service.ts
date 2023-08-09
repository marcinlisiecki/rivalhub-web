import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  mobileView: boolean = window.innerWidth <= 768 ? true : false;

  resizeSubject = new Subject<boolean>();

  constructor() {
    this.resizeSubject.next(this.mobileView);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.mobileView = (event.target as Window).innerWidth <= 768;
    this.resizeSubject.next(this.mobileView);
  }
}
