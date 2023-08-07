import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-section',
  templateUrl: './sidebar-section.component.html',
  styleUrls: ['./sidebar-section.component.scss'],
})
export class SidebarSectionComponent {
  @Input({ required: true }) title!: string;
}
