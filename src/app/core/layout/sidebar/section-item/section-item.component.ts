import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.scss'],
})
export class SectionItemComponent {
  @Input() icon!: string;
  @Input() routerLink!: string;
  @Input() title!: string;
}
