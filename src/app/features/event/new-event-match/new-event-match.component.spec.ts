import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventMatchComponent } from './new-event-match.component';

describe('NewEventMatchComponent', () => {
  let component: NewEventMatchComponent;
  let fixture: ComponentFixture<NewEventMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewEventMatchComponent]
    });
    fixture = TestBed.createComponent(NewEventMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
