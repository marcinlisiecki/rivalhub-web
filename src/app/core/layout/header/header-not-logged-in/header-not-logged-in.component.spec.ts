import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNotLoggedInComponent } from './header-not-logged-in.component';

describe('HeaderNotLoggedInComponent', () => {
  let component: HeaderNotLoggedInComponent;
  let fixture: ComponentFixture<HeaderNotLoggedInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderNotLoggedInComponent]
    });
    fixture = TestBed.createComponent(HeaderNotLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
