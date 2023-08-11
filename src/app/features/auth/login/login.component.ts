import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCredentials } from '@interfaces/auth/login-credentials';
import { AuthService } from '@app/core/services/auth/auth.service';
import { extractMessage } from '@app/core/utils/apiErrors';
import { Subscription } from 'rxjs';
import { Invitation } from '@interfaces/organization/invitation';
import { InvitationsService } from '@app/core/services/invitations/invitations.service';
import { OrganizationsService } from '@app/core/services/organizations/organizations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  registered: boolean = false;
  invitation: boolean = false;

  apiError: string | null = null;
  isLoading: boolean = false;
  queryParamsSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private invitationService: InvitationsService,
    private organizationsService: OrganizationsService,
  ) {}

  ngOnInit(): void {
    this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      this.registered = params['registered'];
      this.invitation = params['invitation'];
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSub?.unsubscribe();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const credentials: LoginCredentials = {
      email: this.email?.value || '',
      password: this.password?.value || '',
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        if (res?.token) {
          this.router.navigateByUrl('/organizations').then();

          let invitations = this.invitationService.getInvitations();
          const userId = this.authService.getUserId();

          this.organizationsService.getMy().subscribe((organizations) => {
            const newInvitations: Invitation[] = [];

            invitations.forEach((item) => {
              if (
                this.invitationService.checkIfAlreadyInOrganization(
                  item,
                  organizations,
                )
              ) {
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

        this.isLoading = false;
        this.apiError = 'Wystąpił nieoczekiwany błąd';
      },
      error: (err: unknown) => {
        this.isLoading = false;
        this.apiError = extractMessage(err);
      },
    });
  }
}
