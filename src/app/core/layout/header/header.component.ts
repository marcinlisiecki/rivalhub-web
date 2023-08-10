import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ViewService } from '@app/core/services/view/view.service';
import { LanguageService } from '@app/core/services/language/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = true;
  mobileView!: boolean;
  authSubscription?: Subscription;
  mobileViewSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private viewService: ViewService,
    private lang: LanguageService,
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService
      .isAuthObservable()
      .subscribe((val: boolean) => {
        this.isLoggedIn = val;
      });

    this.mobileView = this.viewService.mobileView;
    this.mobileViewSubscription = this.viewService.resizeSubject.subscribe(
      (value: boolean) => {
        this.mobileView = value;
      },
    );
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.mobileViewSubscription?.unsubscribe();
  }
}
