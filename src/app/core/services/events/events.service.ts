import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventType } from '@interfaces/event/event-type';
import { environment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs';
import { AddEvent } from '@interfaces/event/add-event';
import { DatePipe } from '@angular/common';
import { PingPongMatch } from '@app/core/interfaces/event/ping-pong/ping-pong-match';
import { GameSet } from '@app/core/interfaces/event/games/game-set';
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
        team1: addEvent.team1,
        team2: addEvent.team2,
      },
    );
  }
}
