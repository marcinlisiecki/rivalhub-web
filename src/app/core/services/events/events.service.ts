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
import { AddDartsLeg } from '@app/core/interfaces/event/games/darts/add-darts-leg';
import { AddDartMatch } from '@app/core/interfaces/event/games/darts/add-dart-match';
import { AddQueue } from '@app/core/interfaces/event/games/darts/add-queue';
import { CreatedDartsMatch } from '@app/core/interfaces/event/games/darts/created-darts-match';
import { FakeDartsLeg } from '@app/core/interfaces/event/games/darts/fake-darts-leg';
import { DartsLeg } from '@app/core/interfaces/event/games/darts/dart-leg';
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
      | BilliardsMatch[]
      | FakeDartsLeg[],
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

  mapDartsMatches(fakeLegs: FakeDartsLeg[]): DartsLeg[] {
    if (!fakeLegs) return [];
    return fakeLegs.map((l) => ({
      id: l.id,
      dartFormat: l.dateFormat,
      dartMode: l.dartMode,
      participants: l.userDetails,
      scoresInMatch: l.scoresInMatch[0],
      bounceOutsInRound: l.bounceOutsInRound[0],
      pointsLeftInLegAfterRound: l.pointsLeftInLegAfterRound[0],
      pointsLeftInLeg: l.pointsLeftInLeg[0],
      placesInLeg: l.placesInLeg[0],
      bounceOutsInLeg: l.bounceOutsInLeg[0],
      bestRoundScoresInLeg: l.bestRoundScoresInLeg[0],
      numberOfRoundsPlayedInLeg: l.numberOfRoundsPlayedInLeg[0],
      userApprovalMap: l.userApprovalMap,
      approved: l.approved,
    }));
  }

  mapDartsMatch(fakeLeg: FakeDartsLeg): DartsLeg {
    return {
      id: fakeLeg.id,
      dartFormat: fakeLeg.dateFormat,
      dartMode: fakeLeg.dartMode,
      participants: fakeLeg.userDetails,
      scoresInMatch: fakeLeg.scoresInMatch[0],
      bounceOutsInRound: fakeLeg.bounceOutsInRound[0],
      pointsLeftInLegAfterRound: fakeLeg.pointsLeftInLegAfterRound[0],
      pointsLeftInLeg: fakeLeg.pointsLeftInLeg[0],
      placesInLeg: fakeLeg.placesInLeg[0],
      bounceOutsInLeg: fakeLeg.bounceOutsInLeg[0],
      bestRoundScoresInLeg: fakeLeg.bestRoundScoresInLeg[0],
      numberOfRoundsPlayedInLeg: fakeLeg.numberOfRoundsPlayedInLeg[0],
      userApprovalMap: fakeLeg.userApprovalMap,
      approved: fakeLeg.approved,
    };
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

  addDartsLeg(
    organizationId: number,
    eventId: number,
    leg: AddDartsLeg,
  ): Observable<DartsLeg> {
    return this.http.post<DartsLeg>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match?type=DARTS`,
      leg,
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

  createDartsLeg(
    organizationId: number,
    eventId: number,
    matchId: number,
  ): Observable<FakeDartsLeg> {
    return this.http.post<FakeDartsLeg>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match/${matchId}/dart/legs`,
      {},
    );
  }

  addDartsMatch(
    organizationId: number,
    eventId: number,
    match: AddDartMatch,
  ): Observable<CreatedDartsMatch> {
    return this.http.post<CreatedDartsMatch>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match?type=DARTS`,
      match,
    );
  }

  addDartsQueue(
    organizationId: number,
    eventId: number,
    matchId: number,
    queue: any,
  ): Observable<FakeDartsLeg> {
    return this.http.post<FakeDartsLeg>(
      environment.apiUrl +
        `/organizations/${organizationId}/events/${eventId}/match/${matchId}/dart/legs/rounds/0`,
      queue,
    );
  }

  deleteDartsQueue(
    organizationId: number,
    eventId: number,
    matchId: number,
    numberOfRound: number,
  ): Observable<FakeDartsLeg> {
    {
      return this.http.delete<FakeDartsLeg>(
        environment.apiUrl +
          `/organizations/${organizationId}/events/${eventId}/match/${matchId}/dart/legs/rounds/0`,
        {
          body: numberOfRound,
        },
      );
    }
  }

  joinEvent(eventId: number, type: string) {
    return this.http.get(
      environment.apiUrl + `/organizations/${eventId}/events/join?type=${type}`,
    );
  }
}
