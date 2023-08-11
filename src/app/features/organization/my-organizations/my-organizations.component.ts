import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../../../core/services/organizations/organizations.service';
import { Organization } from '@interfaces/organization/organization';
import { Invitation } from '@interfaces/organization/invitation';
import { AuthService } from '@app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@app/core/utils/apiErrors';
import { MessageService } from 'primeng/api';
import { InvitationsService } from '@app/core/services/invitations/invitations.service';

@Component({
  selector: 'app-my-organizations',
  templateUrl: './my-organizations.component.html',
  styleUrls: ['./my-organizations.component.scss'],
})
export class MyOrganizationsComponent implements OnInit {
  organizations: Organization[] = [];
  isDefaultAvatar!: boolean;
  invitations: Invitation[] = [];

  constructor(
    private organizationsService: OrganizationsService,
    private authService: AuthService,
    private router: Router,
    private invitationService: InvitationsService,
    private messageService: MessageService,
  ) {
    this.setMyInvitations();
  }

  ngOnInit(): void {
    this.organizationsService.getMy().subscribe({
      next: (res: Organization[]) => {
        this.organizations = res;
      },
    });
  }

  acceptInvitation(invitation: Invitation) {
    this.organizationsService
      .addUserToOrganization(invitation.organization.id, invitation.hash)
      .subscribe({
        next: () => {
          this.setMyInvitations();
          this.router
            .navigateByUrl(`/organizations/${invitation.organization.id}`)
            .then();
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Wystąpił błąd',
            detail: extractMessage(err),
          });
        },
      });
  }

  rejectInvitation(invitation: Invitation) {
    this.invitationService.removeInvitation(invitation.hash);
    this.setMyInvitations();
  }

  setMyInvitations() {
    const userId = this.authService.getUserId();

    this.invitations = (
      JSON.parse(localStorage.getItem('invitations') || '[]') as Invitation[]
    ).filter((item) => item.userId == userId);
  }

  getImagePath(imageUrl: string | null): string {
    this.checkDefaultAvatar(imageUrl);
    if (imageUrl !== null) {
      return imageUrl;
    }
    return 'assets/img/avatars/avatarplaceholder.png';
  }

  createURL(id: number): string {
    return `/organizations/${id}`;
  }

  checkDefaultAvatar(imageUrl: string | null) {
    this.isDefaultAvatar = imageUrl === null ? true : false;
  }
}
