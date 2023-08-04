import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss'],
})
export class DashboardNavComponent {
  organizationId!: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.organizationId = params['id'];
    });
  }
}
