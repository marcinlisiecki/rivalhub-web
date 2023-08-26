import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventType } from '@interfaces/event/event-type';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AddEvent } from '@interfaces/event/add-event';
import { DatePipe } from '@angular/common';
import { PingPongMatch } from '@interfaces/event/games/ping-pong/ping-pong-match';
import { GameSet } from '@app/core/interfaces/event/games/game-set';
import { NewPingPongMatch } from '@interfaces/event/games/ping-pong/new-ping-pong-match';
import { API_DATE_FORMAT } from '@app/core/constants/date';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
  ) {}

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

  setOrganizationEventTypes(
    id: number,
    eventTypes: EventType[],
  ): Observable<EventType[]> {
    const params = new HttpParams().set(
      'eventTypes',
      eventTypes.map((type) => type.toString()).join(','),
    );

    return this.http.post<EventType[]>(
      environment.apiUrl + `/organizations/${id}/admin/event-types`,
      {},
      { params },
    );
  }

  deleteOrganizationEventTypes(
    id: number,
    eventTypes: EventType[],
  ): Observable<EventType[]> {
    const params = new HttpParams().set(
      'eventTypes',
      eventTypes.map((type) => type.toString()).join(','),
    );

    return this.http.delete<EventType[]>(
      environment.apiUrl + `/organizations/${id}/admin/event-types`,
      { params },
    );
  }

  getEventMatches(
    organizationId: number,
    eventId: number,
  ): Observable<PingPongMatch[]> {
    return this.http.get<PingPongMatch[]>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match?type=PING_PONG`,
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
        `/organizations/${organizationId}/events/${eventId}/match/${matchId}/pingpong?type=PING_PONG`,
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

  addEventMatch(
    organizationId: number,
    eventId: number,
    type: EventType,
    newMatch: NewPingPongMatch,
  ): Observable<PingPongMatch> {
    return this.http.post<PingPongMatch>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match?type=${type}`,
      newMatch,
    );
  }

  addEvent(
    addEvent: AddEvent,
    organizationId: number,
    type: string,
  ): Observable<AddEvent> {
    return this.http.post<AddEvent>(
      environment.apiUrl +
        `/organizations/${organizationId}/events?type=${type}`,
      {
        stationList: addEvent.stationList,
        startTime: this.datePipe.transform(addEvent.startTime, API_DATE_FORMAT),
        endTime: this.datePipe.transform(addEvent.endTime, API_DATE_FORMAT),
        host: addEvent.host,
        participants: addEvent.participants,
        description: addEvent.description,
        name: addEvent.name,
        isEventPublic: addEvent.isEventPublic,
      },
    );
  }

  joinEvent(eventId: number, type: string) {
    return this.http.get(
      environment.apiUrl + `/organizations/${eventId}/events/join?type=${type}`,
    );
  }
}
