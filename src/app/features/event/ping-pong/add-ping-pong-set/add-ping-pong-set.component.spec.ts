import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPingPongSetComponent } from './add-ping-pong-set.component';

describe('AddPingPongSetComponent', () => {
  let component: AddPingPongSetComponent;
  let fixture: ComponentFixture<AddPingPongSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPingPongSetComponent]
    });
    fixture = TestBed.createComponent(AddPingPongSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
