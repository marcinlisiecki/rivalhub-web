import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs';
import { EventType } from '@interfaces/event/event-type';
import { Station } from '@interfaces/station/station';
import { EditStation } from '@app/core/interfaces/station/edit-station';
import * as moment from 'moment';

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

  getOrganizationEditStations(
    organizationId: number,
  ): Observable<EditStation[]> {
    return this.http.get<EditStation[]>(
      environment.apiUrl + `/organizations/${organizationId}/stations`,
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
}
