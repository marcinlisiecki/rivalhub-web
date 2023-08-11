import { Injectable } from '@angular/core';
import { Invitation } from '@interfaces/organization/invitation';

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

  removeInvitation(invitation: Invitation) {
    let invitations: Invitation[] = this.getInvitations().filter(
      (item) =>
        item.hash !== invitation.hash || item.userId !== invitation.userId,
    );

    localStorage.setItem('invitations', JSON.stringify(invitations));
  }
}
