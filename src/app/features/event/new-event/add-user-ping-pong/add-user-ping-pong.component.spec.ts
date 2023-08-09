import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPingPongComponent } from './add-user-ping-pong.component';

describe('AddUserPingPongComponent', () => {
  let component: AddUserPingPongComponent;
  let fixture: ComponentFixture<AddUserPingPongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserPingPongComponent]
    });
    fixture = TestBed.createComponent(AddUserPingPongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
