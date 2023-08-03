import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewOrganization } from '../../interfaces/Organization';
import { environment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  constructor(private http: HttpClient) {}

  add(newOrganization: NewOrganization): Observable<{}> {
    return this.http.post<{}>(
      environment.apiUrl + '/organizations',
      newOrganization,
    );
  }
}
