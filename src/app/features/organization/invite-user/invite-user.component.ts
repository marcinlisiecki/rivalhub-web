
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationsService} from "@app/core/services/organizations/organizations.service";
import {environment} from "../../../../environments/enviroment";
import {Organization} from "@interfaces/organization/organization";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {
  orgId!: number
  organizationUrl: any
  organization: any
  inviteForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(
    private route: ActivatedRoute,
    private organizationsService: OrganizationsService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.orgId = params['id'];
    });
    this.loadOrganizationInfo(this.orgId)
  }
  loadOrganizationInfo(id: number) {
    this.organizationsService.choose(id).subscribe({
      next: (resource: Organization) => {
        this.organization = resource
        this.organizationUrl = this.buildInvitationUrl(this.orgId, resource.invitationHash)
      },
      error: (error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
      }
    })
  }

  buildInvitationUrl(id: number, hash: string): string {
    return environment.url + `/organizations/${id}/invitation/${hash}`
  }

  onSubmit() {
    const emailAddress = this.email?.value
    if (emailAddress == null) {
      return
    }

    this.organizationsService.sendInvitation(this.orgId, emailAddress).subscribe(
      (invitationSent) =>  {
        this.router.navigateByUrl(`/organizations/${this.orgId}`).then()
      },
      (error) => {
        console.log('Error has ocurred.');
      })
  }

  get email() {
    return this.inviteForm.get('email')
  }
}
