import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Reservation } from '@app/core/interfaces/reservation/reservation';
import { EventDto } from '@app/core/interfaces/event/event-dto';
import { EditUser } from '@app/core/interfaces/user/edit-user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getMe(): Observable<UserDetailsDto> {
    return this.http.get<UserDetailsDto>(environment.apiUrl + '/users/me');
  }

  verifyAccount(hash: string): Observable<{}> {
    return this.http.get<{}>(environment.apiUrl + `/confirm/${hash}`);
  }

  getUser(id: number): Observable<UserDetailsDto> {
    return this.http.get<UserDetailsDto>(environment.apiUrl + `/users/${id}`);
  }

  editUser(id: number, user: EditUser): Observable<UserDetailsDto> {
    const userData = new FormData();
    userData.append('thumbnail', user.uploadedFile || '');
    userData.append('organization', user.name);

    return this.http.patch<UserDetailsDto>(
      environment.apiUrl + `/users/${id}`,
      userData,
    );
  }

  getCommonEvents(id: number): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(
      environment.apiUrl + `/users/{id}/events/users/${id}/events`,
    );
  }

  getCommonReservations(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      environment.apiUrl + `/users/${id}/reservations`,
    );
  }
}
