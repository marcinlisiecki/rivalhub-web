import { Injectable } from '@angular/core';
import { Invitation } from '@interfaces/organization/invitation';
import { Organization } from '@interfaces/organization/organization';

@Injectable({
  providedIn: 'root',
})
export class InvitationsService {
  constructor() {}

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
}
