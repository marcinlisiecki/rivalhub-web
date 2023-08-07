import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAvailableStationsComponent } from './no-available-stations.component';

describe('NoAvailableStationsComponent', () => {
  let component: NoAvailableStationsComponent;
  let fixture: ComponentFixture<NoAvailableStationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoAvailableStationsComponent]
    });
    fixture = TestBed.createComponent(NoAvailableStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
