import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { inject } from '@angular/core';
import { Invitation } from '@interfaces/organization/invitation';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';

export const joinGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const organizationsService = inject(OrganizationsService);

  if (authService.isAuth()) {
    return true;
  }

  const organizationId: number = route.params['id'];
  organizationsService.choose(organizationId).subscribe((organization) => {
    console.log(route);

    const invitation: Invitation = {
      hash: route.url[route.url.length - 1].toString(),
      organization: {
        name: organization.name,
        id: organization.id,
      },
    };

    if (localStorage.getItem('invitations') === null) {
      localStorage.setItem('invitations', JSON.stringify([]));
    }

    const invitations: Invitation[] = JSON.parse(
      localStorage.getItem('invitations') as string,
    );

    if (invitations.findIndex((item) => item.hash === invitation.hash) === -1) {
      invitations.push(invitation);
    }

    localStorage.setItem('invitations', JSON.stringify(invitations));
  });

  router.navigateByUrl('/login?invitation=true').then();
  return false;
};
