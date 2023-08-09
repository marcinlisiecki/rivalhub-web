import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/core/services/auth/auth.service';
import { RegisterCredentials } from '@interfaces/auth/register-credentials';
import { Router } from '@angular/router';
import { extractMessage } from '@app/core/utils/apiErrors';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(250),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  apiError: null | string = null;
  isLoading: boolean = false;
  passwordPrompt: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  setPasswordPrompt(): string {
    let lang: string = <string>localStorage.getItem('currentLanguage');
    if (lang === 'pl') {
      return 'Wprowadź hasło';
    } else {
      return 'Enter password';
    }
  }

  onSubmit() {
    this.apiError = null;

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const credentials: RegisterCredentials = {
      email: this.email?.value || '',
      name: this.name?.value || '',
      password: this.password?.value || '',
    };

    this.authService.register(credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/login?registered=true').then();
      },
      error: (err: unknown) => {
        this.isLoading = false;
        this.apiError = extractMessage(err);
      },
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
