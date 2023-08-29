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
import { ImageService } from '@app/core/services/image/image.service';
import { LanguageService } from '@app/core/services/language/language.service';
import { Notification } from '@interfaces/user/notification/notification';
import { ErrorsService } from '@app/core/services/errors/errors.service';
import { categoryTypeToLabel } from '@app/core/utils/event';

@Component({
  selector: 'app-my-organizations',
  templateUrl: './my-organizations.component.html',
  styleUrls: ['./my-organizations.component.scss'],
})
export class MyOrganizationsComponent implements OnInit {
  organizations: Organization[] = [];
  isDefaultAvatar!: boolean;
  invitations: Invitation[] = [];
  isAccountVerified: boolean = false;
  isLoading: boolean = true;
  notifications: Notification[] = [];

  constructor(
    private organizationsService: OrganizationsService,
    private authService: AuthService,
    private router: Router,
    private invitationService: InvitationsService,
    private messageService: MessageService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private languageService: LanguageService,
    private errorsService: ErrorsService,
  ) {}

  ngOnInit(): void {
    this.setMyOrganizations();
    this.setMyInvitations();
    this.checkIfAccountIsVerified();
    this.fetchNotifications();

    const registered = this.route.snapshot.queryParams['registered'];
    if (registered) {
      this.messageService.add({
        severity: 'success',
        summary: this.languageService.instant('organization.registerSummary'),
        detail: this.languageService.instant('organization.registerDetail'),
        life: 1000 * 15,
      });
    }
  }

  fetchNotifications() {
    this.usersService.getMyNotifications().subscribe({
      next: (notifications: Notification[]) => {
        this.notifications = notifications.filter(
          (n) => n.status === 'NOT_CONFIRMED',
        );
      },
      error: (err: HttpErrorResponse) => {
        this.errorsService.createErrorMessage(extractMessage(err));
      },
    });
  }

  setMyOrganizations() {
    this.organizationsService.getMy().subscribe({
      next: (res: Organization[]) => {
        this.organizations = res;
        this.setMyInvitations();
        this.organizations.forEach((organization) => {
          organization.imageUrl = this.imageService.getOrganizationImagePath(
            organization.imageUrl,
          );
        });
      },
      complete: () => {
        this.isLoading = false;
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
            summary: this.languageService.instant('api.error.summary'),
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

  createURL(id: number): string {
    return `/organizations/${id}`;
  }

  protected readonly checkDefaultAvatar = this.imageService.checkDefaultAvatar;
  protected readonly categoryTypeToLabel = categoryTypeToLabel;
  protected readonly Event = Event;
  protected readonly EventTarget = EventTarget;
}
