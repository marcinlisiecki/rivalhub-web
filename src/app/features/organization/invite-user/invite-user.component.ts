import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { environment } from '../../../../environments/environment';
import { Organization } from '@interfaces/organization/organization';
import { HttpErrorResponse } from '@angular/common/http';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss'],
})
export class InviteUserComponent implements OnInit {
  orgId!: number;
  invitationLink: string | null = null;
  organization: Organization | null = null;
  inviteForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });


  constructor(
    private route: ActivatedRoute,
    private organizationsService: OrganizationsService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.orgId = params['id'];

      this.organizationsService.getInvitationLink(this.orgId).subscribe({
        next: (link: string) => {
          this.invitationLink = link;
        },
      });
    });
    this.loadOrganizationInfo(this.orgId);
  }
  loadOrganizationInfo(id: number) {
    this.organizationsService.choose(id).subscribe({
      next: (resource: Organization) => {
        this.organization = resource;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.error);
      },
    });
  }

  onSubmit() {
    const emailAddress = this.email?.value;
    if (emailAddress == null) {
      return;
    }

    this.organizationsService
      .sendInvitation(this.orgId, emailAddress).subscribe({
    next: (response) => {
      this.router.navigateByUrl(`/organizations/${this.orgId}?invited=true`).then();
    },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          life: 1000 * 10,
          summary: error.error.message,
        });
      }
    })
  }

  get email() {
    return this.inviteForm.get('email');
  }
}
