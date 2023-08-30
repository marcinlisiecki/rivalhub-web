import { Component, Input } from '@angular/core';
import { RankingDTO } from '@interfaces/ranking/ranking';

interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-ranking-users',
  templateUrl: './ranking-users.component.html',
  styleUrls: ['./ranking-users.component.scss'],
})
export class RankingUsersComponent {
  @Input() users!: RankingDTO[];

  cols!: Column[];

  constructor() {}

  ngOnInit() {
    this.cols = [
      { field: 'code', header: 'Nazwa użytkownika' },
      { field: 'name', header: 'Ilość wygranych' },
      { field: 'category', header: 'Ilość przegranych' },
      { field: 'category', header: 'Ilość gier' },
    ];
  }
}
