import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from '@interfaces/auth/login-credentials';
import { RegisterCredentials } from '@interfaces/auth/register-credentials';
import { AuthResponse } from '@interfaces/auth/login-response';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { JwtService } from '../jwt/jwt.service';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject!: Subject<boolean>;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
  ) {
    this.authSubject = new Subject<boolean>();
    this.authSubject.next(this.isAuth());

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.authSubject.next(this.isAuth());
      }
    });
  }

  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(environment.apiUrl + '/register', credentials)
      .pipe(tap((res) => this.handleSetJwt(res)));
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(environment.apiUrl + '/login', credentials)
      .pipe(tap((res) => this.handleSetJwt(res)));
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.jwtService.getRefreshToken();

    return this.http
      .post<AuthResponse>(
        environment.apiUrl + '/refresh-token',
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } },
      )
      .pipe(tap((res) => this.handleSetJwt(res)));
  }

  handleSetJwt(response: AuthResponse) {
    if (response?.token) {
      this.jwtService.setToken(response.token);
      this.jwtService.setRefreshToken(response.refreshToken);
    }

    this.authSubject.next(this.isAuth());
    return response;
  }

  refreshAuth() {
    let isAuth = this.isAuth();

    this.authSubject.next(!isAuth);
    this.authSubject.next(isAuth);
  }

  logout() {
    this.jwtService.removeToken();
    this.jwtService.removeRefreshToken();
    this.authSubject.next(false);
    localStorage.setItem('selectedOrganization', '');
    this.router.navigateByUrl('/login').then();
  }

  isAuthObservable(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  isAuth(): boolean {
    return this.jwtService.isTokenValid();
  }

  getUserEmail(): string | null {
    return this.jwtService.getUserEmail();
  }

  getUserId(): number | null {
    return this.jwtService.getUserId();
  }

  getUserName(): string | null {
    return this.jwtService.getUserName();
  }

  getActivationTime(): string | null {
    return this.jwtService.getActivationTime();
  }

  amIAdmin(organizationId: number): boolean {
    const adminOrganizationIds = this.jwtService.getAdminOrganizationIds();

    if (adminOrganizationIds === null) {
      return false;
    }

    return adminOrganizationIds.includes(Number(organizationId));
  }
}
