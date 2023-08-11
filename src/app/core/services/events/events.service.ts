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

  getAllEventTypesInApp(): Observable<Set<EventType>> {
    return this.http.get<Set<EventType>>(
      environment.apiUrl + '/organizations/event-types',
    );
  }

  getEventTypesInOrganization(
    organizationId: number,
  ): Observable<Set<EventType>> {
    return this.http.get<Set<EventType>>(
      environment.apiUrl + `/organizations/${organizationId}/event-types`,
    );
  }
}
