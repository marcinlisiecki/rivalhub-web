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
  organizationId!: number;
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
      this.organizationId = params['id'];

      this.organizationsService.getInvitationLink(this.organizationId).subscribe({
        next: (link: string) => {
          this.invitationLink = link;
        },
      });
      this.loadOrganizationInfo(this.organizationId);
    });
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
      .sendInvitation(this.organizationId, emailAddress).subscribe({
    next: (response) => {
      this.router.navigateByUrl(`/organizations/${this.organizationId}?invited=true`).then();
    },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          life: 1000 * 5,
          summary: error.error.message,
        });
      }
    })
  }

  get email() {
    return this.inviteForm.get('email');
  }
}
