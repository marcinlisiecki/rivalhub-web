import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { JwtService } from '../../services/jwt/jwt.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse } from '@interfaces/auth/login-response';

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const token = this.jwtService.getToken();

    if (token != null && request.headers.get('Authorization') === null) {
      request = this.addTokenHeader(request, token);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleUnauthorized(request, next);
        }

        return throwError(() => error);
      }),
    );
  }

  private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      if (this.authService.isAuth()) {
        return this.authService.refreshToken().pipe(
          switchMap((newToken: AuthResponse) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(newToken.token);
            return next.handle(this.addTokenHeader(request, newToken.token));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            const queryParams = this.route.snapshot.queryParams;
            this.router.navigate(['login'], { queryParams }).then();
            return throwError(() => error);
          }),
        );
      } else {
        this.router.navigateByUrl('/login').then();
      }
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token))),
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}
