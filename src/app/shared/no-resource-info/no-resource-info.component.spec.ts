import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResourceInfoComponent } from './no-resource-info.component';

describe('NoResourceInfoComponent', () => {
  let component: NoResourceInfoComponent;
  let fixture: ComponentFixture<NoResourceInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoResourceInfoComponent]
    });
    fixture = TestBed.createComponent(NoResourceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
