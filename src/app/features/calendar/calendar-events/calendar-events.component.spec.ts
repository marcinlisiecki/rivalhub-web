import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventsComponent } from './calendar-events.component';

describe('CalendarFiltersComponent', () => {
  let component: CalendarEventsComponent;
  let fixture: ComponentFixture<CalendarEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarEventsComponent]
    });
    fixture = TestBed.createComponent(CalendarEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
