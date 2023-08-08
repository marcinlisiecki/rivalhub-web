import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.scss'],
})
export class SectionItemComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) routerLink!: string;
  @Input({ required: true }) title!: string;
}
