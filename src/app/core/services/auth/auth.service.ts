import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
} from '../../interfaces/auth';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../../environments/enviroment';
import { CookieService } from 'ngx-cookie';
import { JwtService } from '../jwt/jwt.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject!: Subject<boolean>;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
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

  register(credentials: RegisterCredentials): Observable<{}> {
    return this.http.post(environment.apiUrl + '/register', credentials);
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(environment.apiUrl + '/login', credentials)
      .pipe(
        tap((result: any) => {
          if (result?.token) {
            this.cookieService.put('token', result.token);
          }

          this.authSubject.next(this.isAuth());
          return result;
        }),
      );
  }

  logout() {
    this.cookieService.remove('token');
    this.authSubject.next(false);
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
}
