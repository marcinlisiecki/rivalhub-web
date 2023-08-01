import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterCredentials } from '../../interfaces/auth';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(credentials: RegisterCredentials): Observable<{}> {
    return this.http.post(environment.apiUrl + '/register', credentials);
  }
}
