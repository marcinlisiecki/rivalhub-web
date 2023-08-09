import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLoggedInComponent } from './header-logged-in.component';

describe('HeaderLoggedInComponent', () => {
  let component: HeaderLoggedInComponent;
  let fixture: ComponentFixture<HeaderLoggedInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderLoggedInComponent]
    });
    fixture = TestBed.createComponent(HeaderLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
