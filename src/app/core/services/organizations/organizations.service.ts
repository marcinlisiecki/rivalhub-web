import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs';
import { Organization } from '@interfaces/organization/organization';
import { NewOrganization } from '@interfaces/organization/new-organization';
import { PagedResponse } from '@interfaces/generic/paged-response';
import { NewReservation } from '@interfaces/reservation/new-reservation';
import { Station } from '@interfaces/station/station';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import * as moment from 'moment/moment';
import { EventType } from '@interfaces/event/event-type';
import { EventDto } from '@interfaces/event/event-dto';
import { OrganizationSettings } from '@interfaces/organization/organization-settings';
import { DatePipe } from '@angular/common';
import { API_DATE_FORMAT } from '@app/core/constants/date';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
  ) {}

  add(newOrganization: NewOrganization): Observable<Organization> {
    return this.http.post<Organization>(
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

  getSettings(id: number): Observable<OrganizationSettings> {
    return this.http.get<OrganizationSettings>(
      environment.apiUrl + `/organizations/${id}/settings`,
    );
  }

  getInvitationLink(id: number): Observable<string> {
    return this.http.get(
      environment.apiUrl + `/organizations/${id}/invitation`,
      { responseType: 'text' },
    );
  }

  getEvents(id: number): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(
      environment.apiUrl + `/organizations/${id}/events`,
      {
        params: {
          type: 'PING_PONG',
        },
      },
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
        startTime: this.datePipe.transform(
          reservation.startTime,
          API_DATE_FORMAT,
        ),
        endTime: this.datePipe.transform(reservation.endTime, API_DATE_FORMAT),
      },
    );
  }

  sendInvitation(id: number, emailAddress: string) {
    return this.http.get(
      environment.apiUrl + `/organizations/${id}/invite/${emailAddress}`,
    );
  }

  addUserToOrganization(id: number, hash: string): Observable<Object> {
    return this.http.get(
      environment.apiUrl + `/organizations/${id}/invitation/${hash}`,
    );
  }

  setOrganizationSettings(
    id: number,
    onlyAdminCanSeeInvitationLink: boolean,
  ): Observable<{}> {
    return this.http.post<{}>(
      environment.apiUrl +
        `/organizations/${id}/admin?onlyAdminCanSeeInvitationLink=${onlyAdminCanSeeInvitationLink}`,
      {},
    );
  }
  getEventsCategories(id: number): Observable<EventType[]> {
    return this.http.get<EventType[]>(
      environment.apiUrl + `/organizations/${id}/event-types`,
    );
  }
}
