import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActivitiesComponent } from './dashboard-activities.component';

describe('DashboardActivitiesComponent', () => {
  let component: DashboardActivitiesComponent;
  let fixture: ComponentFixture<DashboardActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardActivitiesComponent]
    });
    fixture = TestBed.createComponent(DashboardActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
