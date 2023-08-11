import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs';
import { EventType } from '@interfaces/event/event-type';
import { Station } from '@interfaces/station/station';
import * as moment from 'moment';
import { NewStation } from '@app/core/interfaces/station/new-station';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  constructor(private http: HttpClient) {}

  formatDate(date: Date): string {
    return moment(date).format('DD-MM-yyyy HH:mm');
  }

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

  getAvailableStations(
    organizationId: number,
    start: Date,
    end: Date,
    type?: EventType,
  ): Observable<Station[]> {
    const formattedStart = this.formatDate(start);
    const formattedEnd = this.formatDate(end);

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
