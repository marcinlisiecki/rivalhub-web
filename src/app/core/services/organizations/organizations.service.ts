import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Organization } from '@interfaces/organization/organization';
import { PagedResponse } from '@interfaces/generic/paged-response';
import { NewReservation } from '@interfaces/reservation/new-reservation';
import { Station } from '@interfaces/station/station';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { Reservation } from '@interfaces/reservation/reservation';
import { EventType } from '@interfaces/event/event-type';
import { EventDto } from '@interfaces/event/event-dto';
import { OrganizationSettings } from '@interfaces/organization/organization-settings';
import { DatePipe } from '@angular/common';
import { API_DATE_FORMAT } from '@app/core/constants/date';
import { EventsService } from '@app/core/services/events/events.service';
import { NewOrganization } from '@app/core/interfaces/organization/new-organization';
import { EditOrganization } from '@app/core/interfaces/organization/edit-organization';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private eventsService: EventsService,
  ) {}

  add(newOrganization: NewOrganization): Observable<Organization> {
    const organizationData = new FormData();
    organizationData.append('thumbnail', newOrganization.uploadedFile || '');
    organizationData.append('color', newOrganization.color);
    organizationData.append('organization', newOrganization.name);

    return this.http.post<Organization>(
      environment.apiUrl + '/organizations',
      organizationData,
    );
  }

  getMy(): Observable<Organization[]> {
    return this.http.get<Organization[]>(
      environment.apiUrl + '/users/organizations',
    );
  }

  delete(id: number): Observable<{}> {
    return this.http.delete<{}>(environment.apiUrl + `/organizations/${id}`);
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

  getEvents(id: number, type: EventType): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(
      environment.apiUrl + `/organizations/${id}/events`,
      {
        params: {
          type,
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

  getOrganizationReservations(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      environment.apiUrl + `/users/${userId}/reservations`,
    );
  }

  newReservation(
    organizationId: number,
    reservation: NewReservation,
  ): Observable<{}> {
    return this.http.post<Station[]>(
      environment.apiUrl + `/organizations/reservations`,
      {
        organizationId: organizationId,
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

  setOrganizationAvatar(
    id: number,
    keepAvatar: boolean,
    avatar?: File,
  ): Observable<{}> {
    const avatarData = new FormData();
    avatarData.append('thumbnail', avatar!);
    avatarData.append('keepAvatar', keepAvatar.toString());
    return this.http.post<{}>(
      environment.apiUrl + `/organizations/${id}/image`,
      avatarData,
    );
  }

  setOrganizationNameAndColor(
    id: number,
    editOrganization: EditOrganization,
  ): Observable<{}> {
    return this.http.patch<{}>(
      environment.apiUrl + `/organizations/${id}`,
      editOrganization,
    );
  }

  getOrganizationSettings(id: number): Observable<OrganizationSettings> {
    return this.http.get<OrganizationSettings>(
      environment.apiUrl + `/organizations/${id}/settings`,
    );
  }

  getEventsCategories(id: number): Observable<EventType[]> {
    return this.http.get<EventType[]>(
      environment.apiUrl + `/organizations/${id}/event-types`,
    );
  }

  getUsersByNamePhrase(id: number, namePhrase: string) {
    let params = new HttpParams();
    params = params.append('namePhrase', namePhrase);
    return this.http.get<UserDetailsDto[]>(
      environment.apiUrl + `/organizations/${id}/users/search`,
      { params },
    );
  }

  // getUsers(
  //   id: number,
  //   page: number,
  //   size: number,
  // ): Observable<PagedResponse<UserDetailsDto>> {
  //   let params = new HttpParams();
  //   params = params.append('page', page.toString());
  //   params = params.append('size', size.toString());
  //   return this.http.get<any>(
  //     environment.apiUrl + `/organizations/${id}/users`,
  //     { params },
  //   );
  // }

  getAdminUsersIds(id: number): Observable<UserDetailsDto[]> {
    return this.http.get<UserDetailsDto[]>(
      environment.apiUrl + `/organizations/${id}/users/admins`,
    );
  }

  kickUser(id: number, userId: number) {
    return this.http.delete(
      environment.apiUrl + `/organizations/${id}/users/${userId}`,
    );
  }

  unAdmin(id: number, userId: number) {
    return this.http.delete(
      environment.apiUrl + `/organizations/${id}/admin/${userId}`,
    );
  }

  grantAdmin(id: number, userId: number) {
    return this.http.post<{}>(
      environment.apiUrl + `/organizations/${id}/admin/${userId}`,
      {},
    );
  }
}
