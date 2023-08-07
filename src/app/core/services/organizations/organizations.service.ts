import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NewOrganization, Organization } from '../../interfaces/Organization';
import { environment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs';
import { EventDto } from '@app/core/interfaces/EventDto';
import { UserDetailsDto } from '@app/core/interfaces/UserDetailsDto';
import { PagedResponse } from '@app/core/interfaces/PagedResponse';
import { Station } from '@interfaces/Station';
import { EventType } from '@interfaces/event';
import { NewReservation } from '@interfaces/reservation';

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

  getUsers(
    id: number,
    page: number,
    size: number,
  ): Observable<PagedResponse<UserDetailsDto>> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    return this.http.get<any>(
      environment.apiUrl + `/organizations/${id}/users`,
      { params: params },
    );
  }

  getOrganizationStations(organizationId: number): Observable<Station[]> {
    return this.http.get<Station[]>(
      environment.apiUrl + `/organizations/${organizationId}/stations`,
    );
  }

  getAvailableStations(
    organizationId: number,
    start: string,
    end: string,
    type?: EventType,
  ): Observable<Station[]> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        onlyAvailable: true,
        start,
        end,
      },
    });

    if (type) {
      params.append('type', type);
    }

    return this.http.get<Station[]>(
      environment.apiUrl + `/organizations/${organizationId}/stations`,
      {
        params,
      },
    );
  }

  newReservation(
    organizationId: number,
    reservation: NewReservation,
  ): Observable<{}> {
    return this.http.post<Station[]>(
      environment.apiUrl + `/organizations/${organizationId}/reservations`,
      reservation,
    );
  }
}
