import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RivalhubComponent } from './rivalhub.component';

describe('RivalhubComponent', () => {
  let component: RivalhubComponent;
  let fixture: ComponentFixture<RivalhubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RivalhubComponent]
    });
    fixture = TestBed.createComponent(RivalhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
