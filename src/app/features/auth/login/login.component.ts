import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCredentials } from '../../../core/interfaces/auth';
import { AuthService } from '../../../core/services/auth/auth.service';
import { extractMessage } from '../../../core/utils/apiErrors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  registered: boolean = false;
  apiError: string | null = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.registered = params['registered'];
    });
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
          this.router.navigateByUrl('/my-organizations').then();
          return;
        }
        this.apiError = 'Wystąpił nieoczekiwany błąd';
      },
      error: (err: unknown) => {
        this.apiError = extractMessage(err);
      },
    });

    this.isLoading = false;
  }
}
