import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingCategoriesComponent } from './ranking-categories.component';

describe('RankingCategoriesComponent', () => {
  let component: RankingCategoriesComponent;
  let fixture: ComponentFixture<RankingCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingCategoriesComponent]
    });
    fixture = TestBed.createComponent(RankingCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
