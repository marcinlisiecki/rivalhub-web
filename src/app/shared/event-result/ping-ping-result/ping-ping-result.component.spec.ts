import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingPingResultComponent } from './ping-ping-result.component';

describe('PingPingResultComponent', () => {
  let component: PingPingResultComponent;
  let fixture: ComponentFixture<PingPingResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PingPingResultComponent]
    });
    fixture = TestBed.createComponent(PingPingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
