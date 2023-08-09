import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/enviroment';
import { NewStation } from '@interfaces/station/new-station';

@Injectable({
  providedIn: 'root',
})
export class AddStationService {
  constructor(private http: HttpClient) {}

  saveStation(id: string, station: NewStation): Observable<NewStation> {
    return this.http.post<NewStation>(
      environment.apiUrl + `/organizations/${id}/stations`,
      station,
    );
  }
}
