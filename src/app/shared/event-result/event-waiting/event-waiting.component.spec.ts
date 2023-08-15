import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWaitingComponent } from './event-waiting.component';

describe('EventWaitingComponent', () => {
  let component: EventWaitingComponent;
  let fixture: ComponentFixture<EventWaitingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventWaitingComponent]
    });
    fixture = TestBed.createComponent(EventWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
