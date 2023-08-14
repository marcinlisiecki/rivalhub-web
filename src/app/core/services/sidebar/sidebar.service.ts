import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  isVisible: boolean = false;

  constructor() {}

  toggleSidebar() {
    this.isVisible = !this.isVisible;
  }
}
