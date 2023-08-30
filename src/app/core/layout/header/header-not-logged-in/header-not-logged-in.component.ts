import { Component, Input } from '@angular/core';
import { SidebarService } from '@app/core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-header-not-logged-in',
  templateUrl: './header-not-logged-in.component.html',
  styleUrls: ['./header-not-logged-in.component.scss'],
})
export class HeaderNotLoggedInComponent {
  @Input() mobileView!: boolean;

  constructor(private sidebarService: SidebarService) {}

  showSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
