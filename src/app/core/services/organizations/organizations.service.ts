import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs';
import { EventDto } from '@interfaces/event/event-dto';
import { Organization } from '@interfaces/organization/organization';
import { NewOrganization } from '@interfaces/organization/new-organization';
import { PagedResponse } from '@interfaces/generic/paged-response';
import { NewReservation } from '@interfaces/reservation/new-reservation';
import { Station } from '@interfaces/station/station';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import * as moment from 'moment/moment';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  constructor(private http: HttpClient) {}

  formatDate(date: Date): string {
    return moment(date).format('DD-MM-yyyy HH:mm');
  }

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
      { params },
    );
  }

  getOrganizationReservations(
    organizationId: number,
  ): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      environment.apiUrl + `/organizations/${organizationId}/reservations`,
    );
  }

  newReservation(
    organizationId: number,
    reservation: NewReservation,
  ): Observable<{}> {
    return this.http.post<Station[]>(
      environment.apiUrl + `/organizations/${organizationId}/reservations`,
      {
        stationsIdList: reservation.stationsIdList,
        startTime: this.formatDate(reservation.startTime),
        endTime: this.formatDate(reservation.endTime),
      },
    );
  }
}
