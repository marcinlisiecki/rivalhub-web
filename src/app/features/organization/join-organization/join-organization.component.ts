import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationsService} from "@app/core/services/organizations/organizations.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Organization} from "@interfaces/organization/organization";

@Component({
  selector: 'app-join-organization',
  templateUrl: './join-organization.component.html',
  styleUrls: ['./join-organization.component.scss']
})
export class JoinOrganizationComponent implements OnInit {
  public organizationId!: number
  public organizationHash: string = ''
  public organization!: Organization
  public responseError?: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationsService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.organizationId = params['id']
      this.organizationHash = params['hash']
    })
    this.loadOrganizationInfo(this.organizationId)
  }

  loadOrganizationInfo(id: number) {
    this.organizationService.choose(id).subscribe({
      next: (resource: Organization) => {
        this.organization = resource
      },
      error: (error: HttpErrorResponse) => {
        this.organization = error.error
      }
    })
  }

  onSubmit() {
    if (!this.organizationId) {
      return
    }
    if (!this.organizationHash) {
      return
    }



    this.organizationService.addUserToOrganization(this.organizationId, this.organizationHash).subscribe({
      next: (organization) => {
        this.router.navigate(['/organizations']).then()
      },
      error: (error: HttpErrorResponse) => {
        this.responseError = error.error.message
      }
  })
  }
}
