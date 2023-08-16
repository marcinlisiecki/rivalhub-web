import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPingPongResultsComponent } from './add-ping-pong-results.component';

describe('AddPingPongResultsComponent', () => {
  let component: AddPingPongResultsComponent;
  let fixture: ComponentFixture<AddPingPongResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPingPongResultsComponent]
    });
    fixture = TestBed.createComponent(AddPingPongResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
