import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCredentials } from '@interfaces/auth/login-credentials';
import { AuthService } from '@app/core/services/auth/auth.service';
import { extractMessage } from '@app/core/utils/apiErrors';
import { Subscription } from 'rxjs';

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
  apiError: string | null = null;
  isLoading: boolean = false;
  queryParamsSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      this.registered = params['registered'];
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
          const url = sessionStorage.getItem("redirectUrl")
          if (url) {
            this.router.navigateByUrl(url).then();
            sessionStorage.removeItem("redirectUrl")
          } else {
            this.router.navigateByUrl('/organizations').then();
          }
          return;
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
