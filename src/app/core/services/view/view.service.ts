import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  mobileView!: boolean;

  resizeSubject = new Subject<boolean>();
  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(['(min-width: 768px)']).subscribe((result) => {
      this.mobileView = !result.matches;
      this.resizeSubject.next(this.mobileView);
    });
  }
}
