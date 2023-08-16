import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventType } from '@interfaces/event/event-type';
import { environment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs';
import { EventDto } from '@interfaces/event/event-dto';
import { NewOrganization } from '@interfaces/organization/new-organization';
import { Organization } from '@interfaces/organization/organization';
import { AddEvent } from '@interfaces/event/add-event';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { PingPongMatch } from '@app/core/interfaces/event/ping-pong/ping-pong-match';
import { GameSet } from '@app/core/interfaces/event/games/game-set';

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

  formatDate(date: Date): string {
    return moment(date).format('DD-MM-yyyy HH:mm');
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
        startTime: this.formatDate(addEvent.startTime),
        endTime: this.formatDate(addEvent.endTime),
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
