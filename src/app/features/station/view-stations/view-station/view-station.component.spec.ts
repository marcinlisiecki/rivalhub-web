import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStationComponent } from './view-station.component';

describe('ViewStationComponent', () => {
  let component: ViewStationComponent;
  let fixture: ComponentFixture<ViewStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStationComponent]
    });
    fixture = TestBed.createComponent(ViewStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
