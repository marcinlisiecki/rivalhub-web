import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventType } from '@interfaces/event/event-type';
import { environment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getAllEventTypesInApp(): Observable<EventType[]> {
    return this.http.get<EventType[]>(
      environment.apiUrl + '/organizations/event-types',
    );
  }

  getEventTypesInOrganization(organizationId: number): Observable<EventType[]> {
    return this.http.get<EventType[]>(
      environment.apiUrl + `/organizations/${organizationId}/event-types`,
    );
  }

  addOrganizationEventType(id: number, eventType: EventType): Observable<{}> {
    return this.http.post<{}>(
      environment.apiUrl +
        `/organizations/${id}/admin/event-types?type=${eventType}`,
      {},
    );
  }

  deleteOrganizationEventType(
    id: number,
    eventType: EventType,
  ): Observable<{}> {
    return this.http.delete<{}>(
      environment.apiUrl +
        `/organizations/${id}/admin/event-types?type=${eventType}`,
      {},
    );
  }
}
