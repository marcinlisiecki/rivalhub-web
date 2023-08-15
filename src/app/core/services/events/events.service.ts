import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventType } from '@interfaces/event/event-type';
import { environment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs';
import { PingPongMatch } from '@interfaces/event/ping-pong/ping-pong-match';
import { GameSet } from '@interfaces/event/game-set';

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

  getEventMatches(
    organizationId: number,
    eventId: number,
  ): Observable<PingPongMatch[]> {
    return this.http.get<PingPongMatch[]>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match`,
    );
  }

  addMatchSet(
    organizationId: number,
    eventId: number,
    matchId: number,
    setList: GameSet[],
  ): Observable<{}> {
    return this.http.post<{}>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match/${matchId}`,
      setList,
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
