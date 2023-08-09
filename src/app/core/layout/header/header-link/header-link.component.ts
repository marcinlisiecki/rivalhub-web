import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-link',
  templateUrl: './header-link.component.html',
  styleUrls: ['./header-link.component.scss'],
})
export class HeaderLinkComponent {
  @Input() routerLink: string = '';
}
