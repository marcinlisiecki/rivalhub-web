import { Injectable } from '@angular/core';
import { Invitation } from '@interfaces/organization/invitation';
import { Organization } from '@interfaces/organization/organization';
import { AuthService } from '@app/core/services/auth/auth.service';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';

@Injectable({
  providedIn: 'root',
})
export class InvitationsService {
  constructor(
    private authService: AuthService,
    private organizationsService: OrganizationsService,
  ) {}

  getInvitations(): Invitation[] {
    return JSON.parse(localStorage.getItem('invitations') || '[]');
  }

  addInvitation(invitation: Invitation) {
    const invitations: Invitation[] = this.getInvitations();

    if (
      invitations.findIndex(
        (item) =>
          item.hash === invitation.hash && item.userId === invitation.userId,
      ) === -1
    ) {
      invitations.push(invitation);
    }

    localStorage.setItem('invitations', JSON.stringify(invitations));
  }

  removeInvitation(hash: string, userId: number | null) {
    let invitations: Invitation[] = this.getInvitations().filter(
      (item) => item.hash !== hash || item.userId !== userId,
    );

    localStorage.setItem('invitations', JSON.stringify(invitations));
  }

  checkIfAlreadyInOrganization(
    invitation: Invitation,
    organizations: Organization[],
  ) {
    let alreadyInOrganization = false;

    organizations.forEach((organization) => {
      if (organization.id === invitation.organization.id) {
        alreadyInOrganization = true;
      }
    });

    return alreadyInOrganization;
  }

  setUserIds() {
    let invitations = this.getInvitations();
    const userId = this.authService.getUserId();

    this.organizationsService.getMy().subscribe((organizations) => {
      const newInvitations: Invitation[] = [];

      invitations.forEach((item) => {
        if (this.checkIfAlreadyInOrganization(item, organizations)) {
          return;
        }

        if (item.userId === null) {
          item.userId = userId;
        }

        newInvitations.push(item);
      });

      localStorage.setItem('invitations', JSON.stringify(newInvitations));
    });
  }
}
