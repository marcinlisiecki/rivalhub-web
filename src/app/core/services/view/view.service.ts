import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  mobileView: boolean = window.innerWidth <= 768 ? true : false;

  resizeEvent = new EventEmitter<boolean>();

  constructor() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize(event: any) {
    this.mobileView = event.target.innerWidth <= 768;
    this.resizeEvent.emit(this.mobileView);
  }
}
