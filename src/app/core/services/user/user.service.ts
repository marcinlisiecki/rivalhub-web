import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetailsDto } from '@app/core/interfaces/user/user-details-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<UserDetailsDto> {
    return this.http.get<UserDetailsDto>(environment.apiUrl + `/users/${id}`);
  }
}
