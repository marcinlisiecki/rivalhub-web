import { Component, OnInit } from '@angular/core';
import { UsersService } from '@app/core/services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@app/core/utils/apiErrors';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent implements OnInit {
  isLoading: boolean = true;
  isSuccess: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const hash = this.route.snapshot.params['hash'];

    this.usersService.verifyAccount(hash).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSuccess = true;
        this.authService.refreshAuth();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = extractMessage(err);
      },
    });
  }
}
