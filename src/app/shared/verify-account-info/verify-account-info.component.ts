import { Component, OnInit } from '@angular/core';
import { UsersService } from '@app/core/services/users/users.service';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { AuthService } from '@app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-account-info',
  templateUrl: './verify-account-info.component.html',
  styleUrls: ['./verify-account-info.component.scss'],
})
export class VerifyAccountInfoComponent implements OnInit {
  isAccountActivated: boolean = true;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let prevAuth = !this.authService.isAuth();

    this.authService.isAuthObservable().subscribe((auth) => {
      if (auth !== prevAuth) {
        prevAuth = auth;

        if (!auth) {
          this.isAccountActivated = true;
          return;
        }

        this.usersService.getMe().subscribe({
          next: (user: UserDetailsDto) => {
            this.isAccountActivated = user.activationTime !== null;
          },
        });
      }
    });
  }

  show(): boolean {
    return !this.router.url.toString().includes('invitation');
  }
}
