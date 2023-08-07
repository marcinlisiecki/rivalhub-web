import { Component } from '@angular/core';
import { navAnimation } from 'src/app/core/animations/sidebar-animation';
import { ViewService } from '@app/core/services/view/view.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [navAnimation],
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  mobileView!: boolean;

  constructor(private viewService: ViewService) {}

  ngOnInit() {
    this.mobileView = this.viewService.mobileView;
    this.viewService.resizeEvent.subscribe((value: boolean) => {
      this.mobileView = value;
    });
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
