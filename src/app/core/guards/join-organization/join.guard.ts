import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { inject } from '@angular/core';
import { Invitation } from '@interfaces/organization/invitation';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { InvitationsService } from '@app/core/services/invitations/invitations.service';

export const joinGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const organizationsService = inject(OrganizationsService);
  const invitationService = inject(InvitationsService);

  const organizationId: number = route.params['id'];
  organizationsService.choose(organizationId).subscribe((organization) => {
    const invitation: Invitation = {
      hash: route.url[route.url.length - 1].toString(),
      userId: authService.isAuth() ? authService.getUserId() : null,
      organization: {
        name: organization.name,
        id: organization.id,
      },
    };

    if (authService.isAuth()) {
      organizationsService.getMy().subscribe((organizations) => {
        if (
          !invitationService.checkIfAlreadyInOrganization(
            invitation,
            organizations,
          )
        ) {
          invitationService.addInvitation(invitation);
        }
      });
    } else {
      invitationService.addInvitation(invitation);
    }
  });

  if (authService.isAuth()) {
    return true;
  }

  localStorage.setItem('loginInvitation', 'true');
  router.navigateByUrl('/login').then();
  return false;
};
