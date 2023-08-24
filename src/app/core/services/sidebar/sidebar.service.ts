import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  isVisible: boolean = false;

  constructor() {}

  isOrganizationView(url: string): number {
    const segments = url.split('/');
    if (
      segments.length === 3 &&
      segments[1] === 'organizations' &&
      !isNaN(+segments[2])
    ) {
      return Number(segments[2]);
    }

    return -1;
  }

  toggleSidebar() {
    this.isVisible = !this.isVisible;
  }
}
