import { Injectable } from '@angular/core';
import { RankingDTO } from '@interfaces/ranking/ranking';
import { OrganizationSettings } from '@interfaces/organization/organization-settings';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getRankingDTO(type: string, id: string): Observable<RankingDTO[]> {
    return this.http.get<RankingDTO[]>(
      environment.apiUrl + `/organizations/${id}/stats?type=${type}`,
    );
  }
}
