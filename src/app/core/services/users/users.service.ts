import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Reservation } from '@app/core/interfaces/reservation/reservation';
import { EventDto } from '@app/core/interfaces/event/event-dto';
import { EditUser } from '@app/core/interfaces/user/edit-user';
import { Notification } from '@interfaces/user/notification/notification';

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

  editMe(user: EditUser): Observable<UserDetailsDto> {
    return this.http.patch<UserDetailsDto>(environment.apiUrl + `/users`, user);
  }

  editMyAvatar(keepAvatar: boolean, avatar?: File): Observable<{}> {
    const avatarData = new FormData();
    avatarData.append('thumbnail', avatar!);
    avatarData.append('keepAvatar', keepAvatar.toString());
    return this.http.post<{}>(environment.apiUrl + `/users/image`, avatarData);
  }

  getMyNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      environment.apiUrl + '/users/notifications',
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
