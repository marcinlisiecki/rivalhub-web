import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActivitiesPanelComponent } from './dashboard-activities-panel.component';

describe('DashboardActivitiesPanelComponent', () => {
  let component: DashboardActivitiesPanelComponent;
  let fixture: ComponentFixture<DashboardActivitiesPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardActivitiesPanelComponent]
    });
    fixture = TestBed.createComponent(DashboardActivitiesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
