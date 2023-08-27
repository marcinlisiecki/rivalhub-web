import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Organization } from '@interfaces/organization/organization';
import { extractMessage } from '@app/core/utils/apiErrors';
import { UsersService } from '@app/core/services/users/users.service';
import { InvitationsService } from '@app/core/services/invitations/invitations.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-join-organization',
  templateUrl: './join-organization.component.html',
  styleUrls: ['./join-organization.component.scss'],
})
export class JoinOrganizationComponent implements OnInit {
  public organizationId!: number;
  public organizationHash: string = '';
  public organization!: Organization;
  public responseError?: string;
  public mainMessage: string = '';
  public isLoaded = false;
  isAccountVerified: null | boolean = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationsService,
    private usersService: UsersService,
    private invitationService: InvitationsService,
    private authService: AuthService,
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.organizationId = parseInt(params['id']);
      this.organizationHash = params['hash'];
    });

    this.loadOrganizationInfo(this.organizationId);
    this.checkIfAlreadyInOrganization();
    this.checkIfAccountIsVerified();
  }

  checkIfAccountIsVerified() {
    this.usersService.getMe().subscribe((user) => {
      this.isAccountVerified = user.activationTime !== null;
    });
  }

  checkIfAlreadyInOrganization() {
    this.organizationService.getMy().subscribe((organizations) => {
      let alreadyInOrganization = false;

      organizations.forEach((organization) => {
        if (organization.id === this.organizationId) {
          alreadyInOrganization = true;
          return;
        }
      });

      if (alreadyInOrganization) {
        this.router
          .navigateByUrl(`/organizations/${this.organizationId}`)
          .then();
      }
    });
  }

  loadOrganizationInfo(id: number) {
    this.organizationService.choose(id).subscribe({
      next: (resource: Organization) => {
        this.organization = resource;
        this.mainMessage = `${this.languageService.instant(
          'organization.joinTo',
        )} "${this.organization.name}"?`;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.mainMessage = extractMessage(error);
        this.organization = error.error;
      },
    });
  }

  onSubmit() {
    if (!this.organizationId) {
      return;
    }
    if (!this.organizationHash) {
      return;
    }

    this.organizationService
      .addUserToOrganization(this.organizationId, this.organizationHash)
      .subscribe({
        next: () => {
          this.invitationService.removeInvitation(
            this.organizationHash,
            this.authService.getUserId(),
          );
          this.router
            .navigateByUrl(`/organizations/${this.organizationId}`)
            .then();
        },
        error: (error: HttpErrorResponse) => {
          this.responseError = error.error.message;
        },
      });
  }
}
