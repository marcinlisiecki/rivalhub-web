import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { Organization } from '@interfaces/organization/organization';
import { Invitation } from '@interfaces/organization/invitation';
import { AuthService } from '@app/core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@app/core/utils/apiErrors';
import { MessageService } from 'primeng/api';
import { InvitationsService } from '@app/core/services/invitations/invitations.service';
import { UsersService } from '@app/core/services/users/users.service';

@Component({
  selector: 'app-my-organizations',
  templateUrl: './my-organizations.component.html',
  styleUrls: ['./my-organizations.component.scss'],
})
export class MyOrganizationsComponent implements OnInit {
  organizations: Organization[] = [];
  isDefaultAvatar!: boolean;
  invitations: Invitation[] = [];
  isAccountVerified: boolean = true;

  constructor(
    private organizationsService: OrganizationsService,
    private authService: AuthService,
    private router: Router,
    private invitationService: InvitationsService,
    private messageService: MessageService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.setMyOrganizations();
    this.setMyInvitations();
    this.checkIfAccountIsVerified();

    const registered = this.route.snapshot.queryParams['registered'];
    if (registered) {
      this.messageService.add({
        severity: 'success',
        summary: 'Pomyślnie zarejestrowano i zalogowano',
        detail:
          'Na podany adres mailowy został wysłany link do aktywacji konta.',
        life: 1000 * 15,
      });
    }
  }

  setMyOrganizations() {
    this.organizationsService.getMy().subscribe({
      next: (res: Organization[]) => {
        this.organizations = res;
        this.setMyInvitations();
      },
    });
  }

  checkIfAccountIsVerified() {
    this.usersService.getMe().subscribe((user) => {
      this.isAccountVerified = user.activationTime !== null;
    });
  }

  acceptInvitation(invitation: Invitation) {
    this.organizationsService
      .addUserToOrganization(invitation.organization.id, invitation.hash)
      .subscribe({
        next: () => {
          this.invitationService.removeInvitation(
            invitation.hash,
            this.authService.getUserId(),
          );
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
    this.invitationService.removeInvitation(invitation.hash, invitation.userId);
    this.setMyInvitations();
  }

  setMyInvitations() {
    const userId = this.authService.getUserId();

    this.invitations = (
      JSON.parse(localStorage.getItem('invitations') || '[]') as Invitation[]
    ).filter((item) => {
      if (item.userId !== userId) {
        return false;
      }

      return !this.invitationService.checkIfAlreadyInOrganization(
        item,
        this.organizations,
      );
    });
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
    this.isDefaultAvatar = imageUrl === null;
  }
}
