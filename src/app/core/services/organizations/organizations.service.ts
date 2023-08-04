import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewOrganization, Organization } from '../../interfaces/Organization';
import { environment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs';
import { EventDto } from '@app/core/interfaces/EventDto';
import { UserDto } from '@app/core/interfaces/UserDto';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  constructor(private http: HttpClient) {}

  add(newOrganization: NewOrganization): Observable<{}> {
    return this.http.post<{}>(
      environment.apiUrl + '/organizations',
      newOrganization,
    );
  }

  getMy(): Observable<Organization[]> {
    return this.http.get<Organization[]>(
      environment.apiUrl + '/users/organizations',
    );
  }

  choose(id: number): Observable<Organization> {
    return this.http.get<Organization>(
      environment.apiUrl + `/organizations/${id}`,
    );
  }

  getEvents(id: number): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(
      environment.apiUrl + `/organizations/${id}/events`,
    );
  }

  getUsers(id: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      environment.apiUrl + `/organizations/${id}/users`,
    );
  }
}
