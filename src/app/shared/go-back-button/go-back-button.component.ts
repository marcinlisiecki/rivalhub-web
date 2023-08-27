import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss'],
})
export class GoBackButtonComponent {
  constructor(private location: Location) {}

  back() {
    this.location.back();
  }
}
