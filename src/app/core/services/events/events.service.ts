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
import { EventDto } from '@interfaces/event/event-dto';
import { UserDetailsDto } from '@interfaces/user/user-details-dto';
import { TableFootballMatch } from '@interfaces/event/games/table-football/table-football-match';
import { NewTableFootballMatch } from '@interfaces/event/games/table-football/new-table-football-match';
import { PullUpsMatch } from '@interfaces/event/games/pull-ups/pull-ups-match';
import { PullUpsSeries } from '@interfaces/event/games/pull-ups/pull-ups-series';
import { NewPullUpsMatch } from '@interfaces/event/games/pull-ups/new-pull-ups-match';
import { PullUpsSeriesScores } from '@interfaces/event/games/pull-ups/pull-ups-series-scores';
import { BilliardsMatch } from '@interfaces/event/games/billiards/billiards-match';
import { NewBilliardsMatch } from '@interfaces/event/games/billiards/new-billiards-match';
import { NewBilliardsResults } from '@interfaces/event/games/billiards/new-billiards-results';

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

  approveMatch(
    organizationId: number,
    eventId: number,
    matchId: number,
    type: EventType,
  ): Observable<{}> {
    return this.http.get<{}>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match/${matchId}/approve`,
      { params: { type } },
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

  getEvent(eventId: number, type: EventType): Observable<EventDto> {
    return this.http.get<EventDto>(
      environment.apiUrl + `/organizations/events/${eventId}`,
      { params: { type } },
    );
  }

  getEventParticipants(
    eventId: number,
    type: EventType,
  ): Observable<UserDetailsDto[]> {
    return this.http.get<UserDetailsDto[]>(
      environment.apiUrl + `/organizations/events/${eventId}/participants`,
      { params: { type } },
    );
  }

  removeEventParticipant(
    eventId: number,
    participantId: number,
    type: EventType,
  ): Observable<UserDetailsDto[]> {
    return this.http.delete<UserDetailsDto[]>(
      environment.apiUrl + `/organizations/events/${eventId}/participants`,
      { body: participantId, params: { type } },
    );
  }

  addEventParticipant(
    eventId: number,
    participantId: number,
    type: EventType,
  ): Observable<UserDetailsDto[]> {
    return this.http.post<UserDetailsDto[]>(
      environment.apiUrl + `/organizations/events/${eventId}/participants`,
      participantId,
      { params: { type } },
    );
  }

  getEventMatches<
    T extends
      | PingPongMatch[]
      | TableFootballMatch[]
      | PullUpsMatch[]
      | BilliardsMatch[],
  >(
    organizationId: number,
    eventId: number,
    eventType: EventType,
  ): Observable<T> {
    return this.http.get<T>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match`,
      { params: { type: eventType } },
    );
  }

  getEventUsers(
    eventId: number,
    eventType: EventType,
  ): Observable<UserDetailsDto[]> {
    return this.http.get<UserDetailsDto[]>(
      environment.apiUrl + `/organizations/events/${eventId}/participants`,
      { params: { type: eventType } },
    );
  }

  addTableFootballSet(
    organizationId: number,
    eventId: number,
    matchId: number,
    setList: GameSet[],
  ): Observable<{}> {
    return this.http.post<{}>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match/${matchId}/tablefootball?type=TABLE_FOOTBALL`,
      setList,
    );
  }

  addPullUpsSeries(
    organizationId: number,
    eventId: number,
    matchId: number,
    series: PullUpsSeries[],
  ): Observable<PullUpsMatch> {
    return this.http.post<PullUpsMatch>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match/${matchId}/pullups?type=PULL_UPS`,
      series,
    );
  }

  addPingPongMatchSet(
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

  removePullUpsSeries(
    organizationId: number,
    eventId: number,
    matchId: number,
    seriesId: number,
  ) {
    return this.http.delete<{}>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match/${matchId}/pullups`,
      { body: seriesId },
    );
  }

  removePingPongOrTableFootballMatchSet(
    organizationId: number,
    eventId: number,
    matchId: number,
    set: GameSet,
    game: 'pingpong' | 'tablefootball',
  ): Observable<{}> {
    return this.http.delete<{}>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match/${matchId}/${game}`,
      { body: set },
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

  addPullUpsMatch(
    organizationId: number,
    eventId: number,
    newMatch: NewPullUpsMatch,
  ): Observable<PullUpsMatch> {
    return this.http.post<PullUpsMatch>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match?type=${EventType.PULL_UPS}`,
      newMatch,
    );
  }

  addBilliardsMatch(
    organizationId: number,
    eventId: number,
    newMatch: NewBilliardsMatch,
  ): Observable<BilliardsMatch> {
    return this.http.post<BilliardsMatch>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match?type=${EventType.BILLIARDS}`,
      newMatch,
    );
  }

  addBilliardsResults(
    organizationId: number,
    eventId: number,
    matchId: number,
    results: NewBilliardsResults,
  ): Observable<BilliardsMatch> {
    return this.http.post<BilliardsMatch>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match/${matchId}/billiards?type=${EventType.BILLIARDS}`,
      results,
    );
  }

  addPingPongMatch(
    organizationId: number,
    eventId: number,
    newMatch: NewPingPongMatch,
  ): Observable<PingPongMatch> {
    return this.http.post<PingPongMatch>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match?type=${EventType.PING_PONG}`,
      newMatch,
    );
  }

  addTableFootballMatch(
    organizationId: number,
    eventId: number,
    newMatch: NewTableFootballMatch,
  ): Observable<TableFootballMatch> {
    return this.http.post<TableFootballMatch>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match?type=${EventType.TABLE_FOOTBALL}`,
      newMatch,
    );
  }

  removeEvent(
    organizationId: number,
    eventId: number,
    type: EventType,
  ): Observable<{}> {
    console.log(eventId);

    return this.http.delete(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}?type=${type}`,
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
