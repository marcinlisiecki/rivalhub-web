import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationsService} from "@app/core/services/organizations/organizations.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Organization} from "@interfaces/organization/organization";
import {extractMessage} from "@app/core/utils/apiErrors";

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
  public mainMessage: string = ""
  public isLoaded = false

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
        this.mainMessage = `Dołączyć do "${this.organization.name}"?`
        this.isLoaded = true
      },
      error: (error: HttpErrorResponse) => {
        this.mainMessage = extractMessage(error)
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
