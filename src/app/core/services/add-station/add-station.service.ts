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

  addStation(url: string, station: Station): Observable<{}> {
    const newUrl = environment.apiUrl + url
    alert(newUrl)
    return this.http.post(newUrl, station)
  }
}
