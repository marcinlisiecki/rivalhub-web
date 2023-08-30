import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { EventType } from '@interfaces/event/event-type';
import { Station } from '@interfaces/station/station';
import * as moment from 'moment';
import { NewStation } from '@app/core/interfaces/station/new-station';
import { ClosestStationAvailable } from '@interfaces/station/closest-station-available';
import { DatePipe } from '@angular/common';
import { API_DATE_FORMAT } from '@app/core/constants/date';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
  ) {}

  getOrganizationStations(organizationId: number): Observable<Station[]> {
    return this.http.get<Station[]>(
      environment.apiUrl + `/organizations/${organizationId}/stations`,
    );
  }

  getOrganizationEditStations(organizationId: number): Observable<Station[]> {
    return this.http.get<Station[]>(
      environment.apiUrl +
        `/organizations/${organizationId}/stations?showInactive=true`,
    );
  }

  getClosestAvailableStations(
    organizationId: number,
    start: Date,
    end: Date,
    type?: EventType,
  ): Observable<ClosestStationAvailable[]> {
    const formattedStart = this.datePipe.transform(
      start,
      API_DATE_FORMAT,
    ) as string;
    const formattedEnd = this.datePipe.transform(
      end,
      API_DATE_FORMAT,
    ) as string;

    const params: HttpParams = new HttpParams({
      fromObject: {
        start: formattedStart,
        end: formattedEnd,
      },
    });

    if (type) {
      params.append('type', type);
    }

    return this.http.get<ClosestStationAvailable[]>(
      environment.apiUrl + `/organizations/${organizationId}/event-stations`,
      {
        params,
      },
    );
  }

  getAvailableStations(
    organizationId: number,
    start: Date,
    end: Date,
    type?: EventType,
  ): Observable<Station[]> {
    const formattedStart = this.datePipe.transform(
      start,
      API_DATE_FORMAT,
    ) as string;
    const formattedEnd = this.datePipe.transform(
      end,
      API_DATE_FORMAT,
    ) as string;

    const params: HttpParams = new HttpParams({
      fromObject: {
        onlyAvailable: true,
        start: formattedStart,
        end: formattedEnd,
      },
    });

    if (type) {
      params.append('type', type);
    }

    return this.http.get<Station[]>(
      environment.apiUrl + `/organizations/${organizationId}/stations`,
      {
        params,
      },
    );
  }

  saveStation(id: number, station: NewStation): Observable<Station> {
    return this.http.post<Station>(
      environment.apiUrl + `/organizations/${id}/stations`,
      station,
    );
  }

  deleteStation(organizationId: number, stationId: number): Observable<{}> {
    return this.http.delete(
      environment.apiUrl +
        `/organizations/${organizationId}/stations/${stationId}`,
    );
  }

  updateStation(organizationId: number, station: Station): Observable<{}> {
    const stationDto = {
      name: station.name,
      type: station.type,
      active: station.active.toString(),
    };
    const url =
      environment.apiUrl +
      `/organizations/${organizationId}/stations/${station.id}`;
    return this.http.patch(url, stationDto);
  }
}
