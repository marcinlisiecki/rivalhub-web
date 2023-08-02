import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
} from '../../interfaces/auth';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/enviroment';
import { CookieService } from 'ngx-cookie';
import { JwtService } from '../jwt/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private jwtService: JwtService,
  ) {}

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

            return result;
          }
        }),
      );
  }

  isAuth(): boolean {
    return this.jwtService.isTokenValid();
  }
}
