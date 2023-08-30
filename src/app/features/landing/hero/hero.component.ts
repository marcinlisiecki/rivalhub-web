import { Component } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  value!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.value = this.authService.isAuth();
    if (this.value) this.router.navigateByUrl('/organizations').then();
  }
}
