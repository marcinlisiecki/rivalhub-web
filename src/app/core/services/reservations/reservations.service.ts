import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '@interfaces/reservation/reservation';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  constructor(private http: HttpClient) {}

  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(
      environment.apiUrl + `/organizations/reservations/${id}`,
    );
  }

  deleteReservation(id: number): Observable<{}> {
    return this.http.delete<{}>(
      environment.apiUrl + `/organizations/reservations/${id}`,
    );
  }
}
