import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewStation} from "../../interfaces/Station";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class AddStationService {

  constructor(
    private http: HttpClient,
  ) { }

  saveStation(id: string, station: NewStation): Observable<{}> {
    return this.http.post<NewStation>(
      environment.apiUrl + `/organizations/${id}/stations`,
      station
    );
  }
}
