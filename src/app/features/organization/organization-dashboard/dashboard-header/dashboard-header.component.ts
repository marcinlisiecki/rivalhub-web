import { Component, Input } from '@angular/core';
import { Organization } from '@interfaces/Organization';
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  @Input({ required: true })
  organization!: Organization;
}
