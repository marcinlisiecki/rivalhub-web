import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingUsersComponent } from './ranking-users.component';

describe('RankingUsersComponent', () => {
  let component: RankingUsersComponent;
  let fixture: ComponentFixture<RankingUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingUsersComponent]
    });
    fixture = TestBed.createComponent(RankingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
