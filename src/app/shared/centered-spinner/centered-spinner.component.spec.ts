import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenteredSpinnerComponent } from './centered-spinner.component';

describe('CenteredSpinnerComponent', () => {
  let component: CenteredSpinnerComponent;
  let fixture: ComponentFixture<CenteredSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CenteredSpinnerComponent]
    });
    fixture = TestBed.createComponent(CenteredSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
