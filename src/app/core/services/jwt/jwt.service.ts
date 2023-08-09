import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private cookieService: CookieService) {}

  getToken() {
    return this.cookieService.get('token');
  }

  setToken(token: string) {
    this.cookieService.put('token', token);
  }

  removeToken() {
    this.cookieService.remove('token');
  }

  decodeToken(token: string) {
    return jwtDecode(token);
  }

  getUserEmailFromToken(decoded: any): string | null {
    return decoded?.sub || null;
  }

  getUserEmail(): string | null {
    const token: string | undefined = this.getToken();
    if (token === undefined) {
      return null;
    }

    const decoded = this.decodeToken(token) || '';
    return this.getUserEmailFromToken(decoded);
  }

  getExpiration(decoded: any): number | null {
    if (!decoded?.exp) {
      return null;
    }

    return decoded.exp;
  }

  isTokenExpired(expiration: number): boolean {
    return expiration < Date.now() / 1000;
  }

  isTokenValid(): boolean {
    const token: string | undefined = this.getToken();
    if (token === undefined) {
      return false;
    }

    const decoded = this.decodeToken(token) || '';
    const email = this.getUserEmailFromToken(decoded);
    const expiration = this.getExpiration(decoded);

    if (email === null || expiration === null) {
      return false;
    }

    return !this.isTokenExpired(expiration);
  }
}
