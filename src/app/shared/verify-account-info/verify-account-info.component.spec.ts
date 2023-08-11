import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAccountInfoComponent } from './verify-account-info.component';

describe('VerifyAccountInfoComponent', () => {
  let component: VerifyAccountInfoComponent;
  let fixture: ComponentFixture<VerifyAccountInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyAccountInfoComponent]
    });
    fixture = TestBed.createComponent(VerifyAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
