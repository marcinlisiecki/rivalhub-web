import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getMe(): Observable<UserDetailsDto> {
    return this.http.get<UserDetailsDto>(environment.apiUrl + '/users/me');
  }
}
